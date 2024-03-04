const sqlite3 = require('sqlite3').verbose();
const {v4} = require('uuid')

// Open the database
let db = new sqlite3.Database('./sql.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the sql.db database.');
});

const hour = (1000 * 60)

const runs = [{
    startTime: 1709443776000,
    endTime: 1709443776000 + hour,
    geo: [
        {latitude: 40.785091, longitude: -73.968285}, // Near the Metropolitan Museum of Art
        {latitude: 40.784083, longitude: -73.964853}, // East Drive
        {latitude: 40.782007, longitude: -73.961246}, // Near the Central Park Zoo
        {latitude: 40.780394, longitude: -73.957135}, // South of The Pond
        {latitude: 40.771133, longitude: -73.974187}, // West Drive, heading north
        {latitude: 40.774925, longitude: -73.973499}, // Mid-Park
        {latitude: 40.778797, longitude: -73.971119}, // Near the Great Lawn
        {latitude: 40.782798, longitude: -73.965395}, // Reservoir running track
        {latitude: 40.785091, longitude: -73.968285}, // Back to start
    ]
},
    {
        startTime: 1709357376000,
        endTime: 1709357376000 * hour,
        geo: [
            {latitude: 37.7955, longitude: -122.3937}, // Ferry Building
            {latitude: 37.8080, longitude: -122.4098}, // Pier 39
            {latitude: 37.8083, longitude: -122.4156}, // Fisherman's Wharf
            {latitude: 37.8024, longitude: -122.4058}, // Coit Tower
            {latitude: 37.8021, longitude: -122.4187}, // Lombard Street
            {latitude: 37.8056, longitude: -122.4226}, // Ghirardelli Square
        ]
    },
    {
        startTime: 1709270976000,
        endTime: 1709270976000 * hour,
        geo: [
            {latitude: 35.7148, longitude: 139.7967}, // Senso-ji Temple
            {latitude: 35.7100, longitude: 139.8107}, // Tokyo Skytree
            {latitude: 35.6951, longitude: 139.7750}, // Edo-Tokyo Museum
            {latitude: 35.6852, longitude: 139.7528}, // Imperial Palace
            {latitude: 35.6852, longitude: 139.7100}, // Shinjuku Gyoen National Garden
        ]
    },
]

runs.forEach(r => {
    db.run('INSERT INTO Run (id, user_id, start_time, end_time, geo_data) values (?, ?, ?, ?, ?)', [v4(), "fa1ee978-d5c5-4da6-a0bf-b0ea51011868", r.startTime, r.endTime, JSON.stringify(r.geo)])
})

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Database connection closed.');
});
