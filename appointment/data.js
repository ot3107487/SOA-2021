const appointments = [
    {
        resourceType: 'Appointment',
        practitioner: {
            reference: 'Practitioner/1',
            display: 'Bogdan Ioan'
        },
        start: '2021-01-11T09:20:20.831Z',
        end: '2021-01-11T17:20:20.831Z',
        subject: {
            reference: 'Patient/1',
            display: 'Fata Morgana'
        }
    },
    {
        resourceType: 'Appointment',
        practitioner: {
            reference: 'Practitioner/1',
            display: 'Bogdan Ioan'
        },
        start: '2021-01-12T05:20:20.831Z',
        end: '2021-01-12T14:20:20.831Z',
        subject: {
            reference: 'Patient/2',
            display: 'Stana Izbasa'
        }
    },{
        resourceType: 'Appointment',
        practitioner: {
            reference: 'Practitioner/1',
            display: 'Bogdan Ioan'
        },
        start: '2021-01-13T05:20:20.831Z',
        end: '2021-01-13T14:20:20.831Z',
        subject: {
            reference: 'Patient/2',
            display: 'Stana Izbasa'
        }
    },{
        resourceType: 'Appointment',
        practitioner: {
            reference: 'Practitioner/1',
            display: 'Bogdan Ioan'
        },
        start: '2021-01-14T05:20:20.831Z',
        end: '2021-01-14T14:20:20.831Z',
        subject: {
            reference: 'Patient/2',
            display: 'Stana Izbasa'
        }
    },{
        resourceType: 'Appointment',
        practitioner: {
            reference: 'Practitioner/1',
            display: 'Bogdan Ioan'
        },
        start: '2021-01-15T05:20:20.831Z',
        end: '2021-01-15T14:20:20.831Z',
        subject: {
            reference: 'Patient/2',
            display: 'Stana Izbasa'
        }
    }
]

appointments.forEach((app,index) => {
    app.id = `${index + 1}`;
});

module.exports.appointments = appointments;