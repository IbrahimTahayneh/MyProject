import Realm from 'realm';

export const PERSON_SCHEMA = 'person';
export const MobappSchema = 'mobapp';

export const MobappSchema = {
    name: MOBAPP_SCHEMA,
    primaryKey: 'maid',
    properties: {
        maid         : { type: 'int' },    // primary key
        masecretid   : { type: 'string'},
        masecretkey  : { type: 'string'},
        notes        : { type: 'string',default: ''},
        create_time  : { type: 'date',default: new Date()},
        modify_time  : { type: 'date',default: new Date()},
    }
};

export const PersonSchema={
    name: PERSON_SCHEMA,
    primaryKey:'pid',
    properties: {
        pid:{ type: 'int', indexed: true },
        username:{ type: 'string', indexed: true },
        email:{type:'string', default:''},
        password:{type:'string', default:''}
    }

}

const databaseOptions = {
    path: 'MyDB.realm',
    schema: [PersonSchema],   
};
/* *** */
export const GetDataRegsLenght = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {        
        let theConf = realm.objects(MOBAPP_SCHEMA);
        let ada=theConf.length;
        resolve(ada);  
    }).catch((error) => {        

        reject(error);  
    });
});

export const GetDataRegs = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {        
        let theConf = realm.objects(MOBAPP_SCHEMA);
        resolve(theConf);  
    }).catch((error) => {        
        reject(error);  
    });
});

export const insertNewMobApp = push_data => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(MOBAPP_SCHEMA, push_data);
            resolve();    
        });
    }).catch((error) => reject(error));
});
export const deleteAllMobApp = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let allconfigs = realm.objects(MOBAPP_SCHEMA);
            realm.delete(allconfigs);
            resolve();
        });
    }).catch((error) => reject(error));;
});

/* *** */
export const GetPersonLenght = (username,password) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {        
        let theConf = realm.objects(PERSON_SCHEMA).filtered('username="'+username+'" AND password="'+password+'"');
       // window.console.log(theConf);
        let ada=theConf.length;
        resolve(ada);  
    }).catch((error) => {        
        reject(error);  
    });
});

export const GetPersonRegs = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {        
        let theConf = realm.objects(PERSON_SCHEMA);
        resolve(theConf);  
    }).catch((error) => {        
        reject(error);  
    });
});
export const GetPersonByPid = (pid) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {        
        let theConf = realm.objects(PERSON_SCHEMA).filtered('pid='+pid);
        resolve(theConf);  
    }).catch((error) => {        
        reject(error);  
    });
});

export const GetPersonByLogin = (username,password) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {        
        let theConf = realm.objects(PERSON_SCHEMA).filtered('username="'+username+'" AND password="'+password+'"');
        resolve(theConf);  
    }).catch((error) => {        
        reject(error);  
    });
});

export const insertNewPerson = push_data => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(PERSON_SCHEMA, push_data);
            resolve();    
        });
    }).catch((error) => reject(error));
});
export const deletePerson = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let allconfigs = realm.objects(PERSON_SCHEMA);
            realm.delete(allconfigs);
            resolve();
        });
    }).catch((error) => reject(error));;
});
export const deletePersonByPid = (pid) => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let deletingperson = realm.objectForPrimaryKey(PERSON_SCHEMA, pid);
            realm.delete(deletingperson);
            resolve();   
        });
    }).catch((error) => reject(error));;
});

export default new Realm(databaseOptions);