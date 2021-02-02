var gTranslate = {
    title: {
        en: 'Sean Bookshop',
        es: 'Librería de Sean',
        he: 'חנות הספרים של שון '

    },
    read: {
        en: 'Read',
        es: 'leer',
        he: 'קרא עוד'
    },
    update: {
        en: 'Update',
        es: 'actualizar',
        he: 'עדכן'
    },
    delete: {
        en: 'Delete',
        es: 'Eliminar',
        he: 'מחק'
    },
    language: {
        en: 'Language:',
        es: 'Idioma:',
        he: 'שפה:'
    },
    sort: {
        en: 'Sort',
        es: 'ordenar',
        he: 'מיון'
    },
    'new-book': {
        en: 'Create new book',
        es: 'Crea un libro nuevo',
        he: 'צור ספר חדש'
    },
    'page-title': {
        en: 'Book-shop',
        es: 'librería',
        he: 'חנות ספרים'
    },
    'table-id': {
        en: 'Id',
        es: 'Número de identificación',
        he: 'מספר ספר'
    },
    'table-title': {
        en: 'Title',
        es: 'título',
        he: 'כותרת'
    },
    'table-price': {
        en: 'Price',
        es: 'precio',
        he: 'מחיר'
    },
    'table-actions': {
        en: 'Actions',
        es: 'comportamiento',
        he: 'פעולות'
    },
    'table-rate': {
        en: 'Rate',
        es: 'Velocidad',
        he: 'דירוג'
    },
    'new-book-name': {
        en: 'New Book Name',
        es: 'Nuevo nombre de libro',
        he: 'שם חדש לספר'
    },
    'new-book-price': {
        en: 'New Book price',
        es: 'Precio del libro nuevo',
        he: 'מחיר חדש לספר'
    },
    'new-book-image': {
        en: 'New Book image URL',
        es: 'URL de imagen de libro nuevo',
        he: 'קישור לתמונה של הספר החדש'

    },
    'new-book-add': {
        en: 'Add book',
        es: 'Agregar libro',
        he: 'הוסף ספר'
    },
    'sort-name': {
        en: 'Name',
        es: 'Nombre',
        he: 'שם'
    },
    'sort-price': {
        en: 'Price',
        es: 'precio',
        he: 'מחיר'
    }
}

var gCurrLang = 'en';

function doTrans() {
    var elTranslats = document.querySelectorAll('[data-translate]');
    elTranslats.forEach(function(el) {

        var transKey = el.dataset.translate;
        var txt = getTrans(transKey);
        if (txt) {
            if (el.nodeName === 'INPUT') el.setAttribute('placeholder', txt);
            else el.innerText = txt;
        }
    })
}

function getTrans(transKey) {
    var translateKey = gTranslate[transKey];
    if (!translateKey) return null;
    var txt = translateKey[gCurrLang];

    // if not found return en
    if (!txt) txt = translateKey['en'];
    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function getCurrLan() {
    return gCurrLang;
}


function formatCurrency(num) {
    if (gCurrLang === 'he') {
        return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num * 3.299);
    } else if (gCurrLang === 'es') {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(num * 0.830);
    } else return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}