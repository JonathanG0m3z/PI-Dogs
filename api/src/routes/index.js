const { Router } = require('express');
const { getDogs, getBreedById, getTemperaments, postDogs } = require('./functions');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", async (req,res)=>{
    const {name} = req.query;//se trae el nombre por query
    try {
        const dogs = await getDogs(name);//se envía a la función encargada de traer y validar los datos
        res.status(200).json(dogs);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get("/dogs/:idBreed", async (req,res)=>{
    const {idBreed} = req.params;
    try {
        const Breed = await getBreedById(idBreed);
        res.status(200).json(Breed);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.get("/temperaments", async (req,res)=>{
    try {
        const temperaments = await getTemperaments();
        res.status(200).json(temperaments);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

router.post("/dogs", async (req,res)=>{
    const {name, imperialHeight, metricHeight, imperialWeight, metricWeight, life_span, temperament} = req.body;
    try {
        const newBreed = await postDogs(name, imperialHeight, metricHeight, imperialWeight, metricWeight, life_span, temperament);
        res.status(200).json(newBreed);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});

module.exports = router;
