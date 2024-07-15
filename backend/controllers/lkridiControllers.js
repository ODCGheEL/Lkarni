const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createLkridi = async (req, res) => {
    try {
        const userId = req.user.userId;
        const lkridi = await prisma.lkridi.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                user: { connect: { id: userId } },
            },
        });
        res.status(201).json(lkridi);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: error.message });
    }
};

exports.getLkridi = async(req, res) => {
    try{
        const userId = req.user.userId;
        const lkridi = await prisma.lkridi.findMany({
            where: { userId: userId }
        })
        res.status(200).json(lkridi);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

exports.getLkridiById = async (req, res) => {
    try{
        const lkridiId = req.params.id
    const userId = req.user.userId;
        const lkridi = await prisma.lkridi.findUnique({
            where: {
                id: lkridiId,
                userId: userId,
            },
        });
        res.status(200).json(lkridi);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

exports.updateLkridi = async(req, res) => {
    try{
        const lkridiId = req.params.id
        const userId = req.user.userId;

        const lkridi = await prisma.lkridi.findUnique({
            where: { id: lkridiId },
            include: { user: true }, // Include the user object to check ownership
        });

        if (!lkridi) {
            return res.status(404).json({ message: 'Lkridi not found' });
        }

        if (lkridi.user.id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not own this lkridi' });
        }

        const updatedLkridi = await prisma.lkridi.update({
            where: { id: lkridiId },
            data: {
                title: req.body.title,
                description: req.body.description,
            },
        });

        res.status(201).json(updatedLkridi);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

exports.deleteLkridi = async(req, res) => {
    try{
        const userId = req.user.userId;
        const lkridiId = req.params.id

        const lkridi = await prisma.lkridi.findUnique({
            where: { id: lkridiId },
            include: { user: true }, // Include the user object to check ownership
        });

        if (!lkridi) {
            return res.status(404).json({ message: 'Lkridi not found' });
        }

        if (lkridi.user.id !== userId) {
            return res.status(403).json({ message: 'Forbidden: You do not own this lkridi' });
        }

        await prisma.lkridi.delete({
            where: { id: lkridiId },
        });

        res.status(204).json({ message: 'Lkridi deleted' });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}