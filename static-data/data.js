const users = {
    bogdan: '1',
    mihai: '2',
    ioan: '3'
}

const patients = [
    {
        resourceType: 'Patient',
        id: '1',
        name: 'Rowana Plumb'
    },
    {
        resourceType: 'Patient',
        id: '2',
        name: 'Margareta Pislaru'
    },
    {
        resourceType: 'Patient',
        id: '3',
        name: 'Sofia Vicoveanca'
    },
    {
        resourceType: 'Patient',
        id: '4',
        name: 'Marga Barbu'
    },
    {
        resourceType: 'Patient',
        id: '5',
        name: 'Maria Buza'
    },
    {
        resourceType: 'Patient',
        id: '6',
        name: 'Monica Macovei'
    },
    {
        resourceType: 'Patient',
        id: '7',
        name: 'Codruta Kovesi'
    }
];

const practitioners = [
    {
        resourceType: 'Practitioner',
        id : '1',
        name: 'Bogdan Ioan'
    },
    {
        resourceType: 'Practitioner',
        id : '2',
        name: 'Mihai Sora'
    },
    {
        resourceType: 'Practitioner',
        id : '3',
        name: 'Ioan Slavici'
    }
];

function getUserInfo(user) {
    return practitioners.find(p => p.id === users[user]);
}

module.exports.practitioners = practitioners;
module.exports.patients = patients;
module.exports.getUserInfo = getUserInfo;
