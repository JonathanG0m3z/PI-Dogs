const axios = require('axios');
const {Temperament, Breed} = require('../db.js');
const {Op} = require("sequelize");

const getDogs = async (name)=>{
    if(name){ //si el nombre existe
        //hacemos una peticion a la api externa para traer todas las posibles razas
        const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);//tambien hay dos variables
        //una contiene los datos recibidos de la api externa y la otra de la base de datos
        const dogsDB = await Breed.findAll({where: {//en este where se hace uso del operador iLike
            name: {[Op.iLike]: `%${name}%`}//para buscar culaquier nombre que contenga el name
        },include: {//aqui le decimos que incluya la relacion que existe entre temperamentos y las razas
            model:Temperament,
            through: {attributes: []}//en esta parte le decimos a la base de datos que dse la relación nos devulva
            //solo los datos importantes. ID y name
        }});
        const dogs = dogsApi.data.concat(dogsDB);
        return dogs;  
        //los return se hacen con .data porque axios devuelve un super objeto y la información
        //que nos interesa se encuentra en data
    }else{//si el nombre no existe
        //si se cumple esta condición es porque queremos traer todas las razas
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
        const dogsDB = await Breed.findAll({include: {
            model:Temperament,
            through: {attributes: []}
        }});
        const dogs = dogsApi.data.concat(dogsDB);
        return dogs;   
    }
};

const getBreedById = async (idBreed)=>{
    const dogs = await axios.get('https://api.thedogapi.com/v1/breeds');//traemos todas las razas
    let foundDog = dogs.data.find((dog)=>dog.id==idBreed);//usamos un .find para ent¡contrar la unica raza con ese id
    if(!foundDog) {
        foundDog = await Breed.findByPk(idBreed,{include: {
            model:Temperament,
            through: {attributes: []}
        }});
        if(!foundDog) throw Error("ID Breed didn't find");
    }//si el array que devulve está vació entonces devulve un error 404
    return foundDog;// si no devulve la raza que encontró
};

const getTemperaments= async ()=>{
    let temperaments = await Temperament.findAll(); //primmero llamamos todos los registros que existan en base de datos
    if(!temperaments.length){ //vaidamos si existen los registros o no
        //si no existen los registros en la base se datos
        const breeds = await axios.get('https://api.thedogapi.com/v1/breeds');//traemos todas las razas de la api
        let duplicateTemperaments = [];//creo un array vacio donde se van a listar todos los temepramentos, aceptando duplicados
        breeds.data.forEach((breed)=>{// tomo la información de las razas y por cada objeto
            //se extraen los temperamentos del string con un split y se almcenan en un array
            //posteriormente se concatena con el array que se creo anteriormente para que no se pierda información anterior
            //entonces se concatena el mismo con los temepramentos recien extraidos
            if(breed.temperament) duplicateTemperaments = duplicateTemperaments.concat(breed.temperament.split(", "));
        });
        let uniqueTemperaments = [... new Set(duplicateTemperaments)];//aquí se hace uso de Set que lo que hace a grandes rasgos
        //es devolver un array pero sin elementos duplicados
        uniqueTemperaments.sort();
        uniqueTemperaments = uniqueTemperaments.map((temperament)=>{
            return {temperament};//ese array con los temperamentos sin duplicados lo tomamos 
            //y cada temperamento lo tranformamos en un objeto para posteriormente ingresarlo a base de datos
        });
        temperaments = await Temperament.bulkCreate(uniqueTemperaments);
        //hacemos uso del metodo bulkCreate que lo que hace es tomar un arreglo de objetos y los ingresa
        //uno por uno a base de datos entonces en un solo query ingresamos todos los temepramentos
    }
    //si existen los registros en base de datos entonces los retorna
    //si no existia entonces el let temperaments fue modificado por lo que devolvió la base de datos después
    //de haberse ingresado todos los temperamentos
    return temperaments;
};

const postDogs = async (name, imperialHeight, metricHeight, imperialWeight, metricWeight, life_span, temperament)=>{
    try {
        const newBreed = await Breed.create({name, imperialHeight, metricHeight, imperialWeight, metricWeight, life_span});
        //recibimos toda esa data y la ingreamos a base de datos a excepcion del temperamento
        newBreed.addTemperament(temperament);//el temperamento es una relación asi que hacemos uso del metodo regalado por sqlize
        return newBreed; 
    } catch (error) {
        throw Error(error.message);
    }
    
};

const filterData = async (filterByTemperament,filterByDataSource)=>{
    try {
        if(filterByDataSource===undefined||!filterByDataSource.length) return [];

        const allDataDB = await Breed.findAll({include: {//aqui le decimos que incluya la relacion que existe entre temperamentos y las razas
            model:Temperament,
            through: {attributes: []}//en esta parte le decimos a la base de datos que dse la relación nos devulva
            //solo los datos importantes. ID y name
        }});

        // const firtsFilter = filterByDataSource.length===2?allDataDB.concat(await axios.get('https://api.thedogapi.com/v1/breeds').data):
        //     filterByDataSource[0]==='api'?
        //     await axios.get('https://api.thedogapi.com/v1/breeds'):allDataDB;

        if (filterByDataSource.length===2) {
            const allApi=await axios.get('https://api.thedogapi.com/v1/breeds');
            firtsFilter = allApi.data.concat(allDataDB);
        }else{
            const allApi=await axios.get('https://api.thedogapi.com/v1/breeds');
            firtsFilter = filterByDataSource[0]==='api'?allApi.data:allDataDB;
        }


        if(filterByTemperament[0]==='All') return firtsFilter;

        const result = firtsFilter.filter((breed)=>{
            for (let i = 0; i < filterByTemperament.length; i++) {
                if(breed.temperament?.includes(filterByTemperament[i])) return true;
            }
        });
        return result;

    } catch (error) {
        throw Error(error.message);
    }
    
};

module.exports = {getDogs,getBreedById,getTemperaments,postDogs,filterData}