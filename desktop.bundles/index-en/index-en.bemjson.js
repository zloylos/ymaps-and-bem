({
    block: 'b-page',
    title: 'Riga, shops',
    head: [
        { elem: 'css', url: '_index-en.css', ie: false },
        { block: 'i-jquery', elem: 'core' },
        { elem: 'js', url: '_index-en.js' }
    ],
    content: [
        {
            block: 'container',
            mix: [{ block: 'i-geo-controller', js: true }],
            content: [
                {
                    // Блок карты, который автоматически добавляет АПИ Яндекс.Карт.
                    block: 'map',
                    mods: { 'api': 'ymaps' },
                    mix: [{ block: 'i-geo-controller', elem: 'map' }],
                    // Параметры для загрузки АПИ Яндекс.Карт.
                    js: {
                        'lang': 'en-EN',
                        'center': [56.950972, 24.110262],
                        'zoom': 12,
                        // Добавляем геообъекты на карту.
                        'geoObjects': [
                            {
                                collection: true,
                                properties: {
                                    id: 'group-1',
                                    name: 'Group 1',
                                    // Нужно для нашего алгоритма переключения меток,
                                    // чтобы не путать с обычными метками, добавленными на карту.
                                    collection: true
                                },
                                options: {
                                    preset: 'twirl#orangeIcon'
                                },
                                data: [
                                    { coords: [56.951394, 24.102709], properties: { id: 'group-1-1', balloonContent: 'Hobbywool' } },
                                    { coords: [56.950972, 24.110262], properties: { id: 'group-1-2', balloonContent: 'OT Stils — clothes designed in Latvia' } },
                                    { coords: [56.950175, 24.106743], properties: { id: 'group-1-3', balloonContent: 'Latvijas delikateses (Latvian Delicacies)' } }
                                ]
                            },
                            {
                                collection: true,
                                properties: {
                                    id: 'group-2',
                                    name: 'Group-2',
                                    collection: true
                                },
                                options: {
                                    preset: 'twirl#redIcon'
                                },
                                data: [
                                    { coords: [56.948674, 24.105198], properties: { id: 'group-2-1', balloonContent: 'National costume centre "Senā klēts"' } },
                                    { coords: [56.948205, 24.112152], properties: { id: 'group-2-2', balloonContent: 'MADARA ecocosmetics' } },
                                    { coords: [56.956904, 24.113653], properties: { id: 'group-2-3', balloonContent: 'Abra' } }
                                ]
                            },
                            {
                                collection: true,
                                properties: {
                                    id: 'group-3',
                                    name: 'Group-3',
                                    collection: true
                                },
                                options: {
                                    preset: 'twirl#greenIcon'
                                },
                                data: [
                                    { coords: [56.957983, 24.127729], properties: { id: 'group-3-1', balloonContent: 'RIIJA Shop' } },
                                    { coords: [56.955961, 24.125718], properties: { id: 'group-3-2', balloonContent: 'Madam Bonbon' } }
                                ]
                            }
                        ],
                        // Устанавливать ли bounds карты по области,
                        // охватывающей все геообъекты.
                        'setupBoundsByGeoObjects': true,
                        // Включить / выключить слой OSM тайлов.
                        'setupOSMTiles': false
                    }
                },
                {
                    block: 'sidebar',
                    content: [
                        {
                            block: 'menu',
                            mix: [{ block: 'i-geo-controller', elem: 'menu' }],
                            content: [
                                {
                                    block: 'menu',
                                    placemarksGroupId: 'group-1',
                                    content: [
                                        {
                                            elem: 'title',
                                            content: 'Group-1'
                                        },
                                        {
                                            elem: 'content',
                                            content: [
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-1-1',
                                                    content: "Hobbywool"
                                                },
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-1-2',
                                                    content: "OT Stils — clothes designed in Latvia"
                                                },
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-1-3',
                                                    content: "Latvijas delikateses (Latvian Delicacies)"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'menu',
                                    placemarksGroupId: 'group-2',
                                    content: [
                                        {
                                            elem: 'title',
                                            content: 'Group-2'
                                        },
                                        {
                                            elem: 'content',
                                            content: [
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-2-1',
                                                    content: "National costume centre 'Senā klēts'"
                                                },
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-2-2',
                                                    content: "MADARA ecocosmetics"
                                                },
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-2-3',
                                                    content: "Abra"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    block: 'menu',
                                    placemarksGroupId: 'group-3',
                                    content: [
                                        {
                                            elem: 'title',
                                            content: 'Group-3'
                                        },
                                        {
                                            elem: 'content',
                                            content: [
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-3-1',
                                                    content: "RIIJA Shop"
                                                },
                                                {
                                                    elem: 'item',
                                                    placemarkId: 'group-3-2',
                                                    content: "Madam Bonbon"
                                                }                                            
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});