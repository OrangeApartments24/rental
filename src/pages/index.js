import './index.css';
import Popup from '../components/popup.js';

const apiKey = 'deb97502-593f-4f3d-a1d5-b5570b7e4dc2';
const leadForm = document.forms.lead;

const addresses = [
    { cords: ["37.505112", "55.936111"], name: "Долгопрудный, Новый бульвар 9к1" },
    { cords: ["37.506936", "55.937422"], name: "Долгопрудный,Новый б-р, 5" },
    { cords: ["37.507987", "55.93655"], name: "Долгопрудный, Новый бульвар 5к1" },
    { cords: ["37.504268", "55.935859"], name: "Долгопрудный, Космонавта Сереброва 4" },
    { cords: ["37.503693", "55.937462"], name: "Долгопрудный, Новый бульвар 9" },
    { cords: ["37.51423", "55.933302"], name: "Долгопрудный, Долгопрудная Аллея 15к5" },
    { cords: ["37.48331", "55.947328"], name: "Долгопрудный, Парковая 52" },
    { cords: ["37.866208", "55.905568"], name: "Королёв, Академика Легостаева 8" },
    { cords: ["37.850371", "55.917077"], name: "Королёв, Октябрьский бульвар 26" },
    { cords: ["37.500621", "55.932929"], name: "Долгопрудный, Проспект Ракетостроителей 5к1" },
    { cords: ["37.850371", "55.917077"], name: "Королёв, Октябрьский бульвар 26" },
    { cords: ["37.722891", "55.917455"], name: "Мытищи, Улица Мира 35" },
    { cords: ["37.718435", "55.914211"], name: "Мытищи, Улица Юбилейная 6" },
    { cords: ["37.718741", "55.919841"], name: "Мытищи, Улица Мира 39" },
    { cords: ["37.715255", "55.913101"], name: "Мытищи, Улица Юбилейная 10" },
    { cords: ["37.720645", "55.915427"], name: "Мытищи, Улица Юбилейная 4" },
]

const prices = [
    { name: 'Мытищи', prices: [25000, 35000] },
    { name: 'Королёв', prices: [20000, 30000] },
    { name: 'Долгопрудный', prices: [28000, 38000] },
    { name: 'Москва', prices: [35000, 50000] },
]

leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneNumber = e.currentTarget.elements.phone.value;

    e.target.innerHTML = '<p class="call__text">Спасибо, ваша заявка отправлена</p>';

    fetch('https://orangeapartments24.bitrix24.ru/rest/2952/g8k1abjojuyqn8xq/crm.lead.add.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "fields": {
                "TITLE": "Аренда Квартир",
                "PHONE": [ { "VALUE": phoneNumber, "VALUE_TYPE": "WORK" } ] 
            },
            "params": { 'REGISTER_SONET_EVENT': 'Y' }
        })
    }).then(res => {
        if(res.ok) { return res.json() }
    }).then(data => {
        console.log(data)
    }).catch(err => {
        console.log('Err:' + err);
    })

})

const popup = new Popup('.popup');
popup.setEventListeners();

ymaps.ready(init);

function init() {
    var myPlacemark,
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        });

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        getAddress(coords);
    });

    function getAddresses(myMap) {
        addresses.forEach(el => {
            myMap.geoObjects.add(new ymaps.Placemark(el.cords.reverse(), {
                balloonContent: el.name
            }, {
                preset: 'islands#circleIcon',
                iconColor: '#E68E38'
            }))
        })
    }

    getAddresses(myMap);

    const getPrice = (name) => {
        return prices.find((el) => el.name === name).prices || [0,0]
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        ymaps.geocode(coords).then(function (res) {
            const firstGeoObject = res.geoObjects.get(0);
            const localities = firstGeoObject.getLocalities();

            if(localities.length > 0) {
                
                const price = getPrice(localities[0]);
                popup.open(price[0], price[1]);
                
            }

        });
    }
}