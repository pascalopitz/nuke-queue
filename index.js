const _ = require('lodash');
const Sonos = require('node-sonos');

console.log('Searching for Sonos devices...');
const search = Sonos.search();

const BLACKLIST = [
    'Pnau',
    'Lorde',
    'Clean Bandit',
    'Bliss n Eso',
    'Calvin Harris',
    'Maroon 5',
    'Mura Masa',
    'Nevada',
    'Snakehips',
    'Robin Schulz',
    'Jon Bellion',
    'Starley',
    'The Chainsmokers',
    'Cheat Codes',
    'Sofi Tukker',
    'Peking Duk',
    'Martin Jensen',
    'The Vamps',
    'ODESZA',
    'Isaiah',
    'Ed Sheeran',
    'Flume',
    'Naughty Boy',
    'Martin Solveig',
    'Mr. Probz',
    'L D R U',
    'Chance The Rapper',
    'Bebe Rexha',
    'Rudimental',
    'Dillon Francis',
    'Zara Larsson',
    'Tom Jay Williams',
    'Martin Garrix',
    'Steve Aoki',
    'Ed Sheeran',
    'PON CHO',
    'FRENSHIP',
    'Drake',
    'Bruno Mars',
    'Jax Jones',
    'NERVO',
    'Milky Chance',
    'Vice',
    'Sage The Gemini',
    'San Holo',
    'Olivia Holt',
    'Katy Perry',
    'Cosmo\'s Midnight',
    'Gryffin',
    'Marky Style'
];

search.on('DeviceAvailable', function (device, model) {
    console.log(device, model)
    //search.destroy();

    device.getQueue(function (err, resp) {
        //console.log(err, resp);

        const blacklisted = _(resp.items)
                            .map(t => t.artist)
                            .uniq()
                            .intersection(BLACKLIST)
                            .value();

        if (!blacklisted.length) {
            console.log('All good');
            process.exit();
            return;
        }

        console.log('Nuke queue');
        device.flush((err) => {
            console.log('Nuke queue done!');
            process.exit();
        });

    });
});
