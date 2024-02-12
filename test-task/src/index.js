let products = []; // Объявляем глобальную переменную для хранения товаров

// После того, как DOM загружен
document.addEventListener('DOMContentLoaded', async () => {
    products = await fetchAvailableItems(); // Загружаем товары при загрузке страницы
    populateDropdown(products); // Заполняем выпадающий список
    clearProductTable(); // Очищаем таблицу при загрузке страницы

    // Добавляем слушатели событий
    document.getElementById('addProductBtn').addEventListener('click', async () => {
        const selectedProduct = document.getElementById('productName').value;
        await addProductDetails(selectedProduct); // Добавить информацию о товаре
    });

    document.getElementById('checkAvailabilityBtn').addEventListener('click', async (event) => {
        event.preventDefault(); // Предотвратить отправку формы
        await checkAllProductAvailability(); // Проверить наличие всех товаров
    });
});

// Функция для добавления информации о товаре
async function addProductDetails(productName) {
    const product = getProductDetails(productName);
    if (product) {
        const productInfoDiv = document.getElementById('result');
        productInfoDiv.innerHTML = ``;

        // Добавить информацию о товаре в таблицу
        await addProductToTable(product);
    } else {
        console.log('Такого товара не существует!');
    }
}

// Функция для добавления товара в таблицу
async function addProductToTable(product) {
    // Найти таблицу
    const tableBody = document.querySelector('#productTable tbody');

    // Создать новую строку
    const newRow = tableBody.insertRow();

    // Создать ячейки для ID, названия, описания и количества товара
    const idCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const descriptionCell = newRow.insertCell(2);
    const quantityCell = newRow.insertCell(3);

    // Установить текст ячейки для товара
    idCell.textContent = product.id;
    nameCell.textContent = product.name;
    descriptionCell.textContent = product.description;
    quantityCell.textContent = ''; // Пока не проверили наличие, оставляем ячейку пустой
}

// Функция для очистки таблицы
function clearProductTable() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = ''; // Очищаем содержимое tbody
}

// Функция для проверки наличия всех товаров
async function checkAllProductAvailability() {
    for (const product of products) {
        await checkProductAvailability(product.name);
    }
}

// Функция для проверки наличия товара
async function checkProductAvailability(productName) {
    const product = getProductDetails(productName);
    if (product) {
        try {
            const data = await fetchAvailableItems();
            const foundProduct = data.find(item => item.name === product.name);
            if (foundProduct) {
                // Найден товар, обновляем ячейку с количеством
                const quantityCell = document.querySelector(`#productTable tbody tr:nth-child(${products.indexOf(product) + 1}) td:nth-child(4)`);
                quantityCell.textContent = `${foundProduct.quantity}`;
            } else {
                console.log(`Товар "${product.name}" недоступен`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            console.log('Ошибка при выполнении запроса');
        }
    } else {
        console.log('Выберите товар из списка!');
    }
}

// Функция для получения информации о товаре по его имени
function getProductDetails(productName) {
    return products.find(product => product.name === productName);
}

// Функция для имитации запроса к псевдо-API
async function fetchAvailableItems() {
    try {
        // Имитация задержки запроса (для реализма)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Подготовка данных
        const data = {
            status: 'ok',
            items: [
                { id: 5899, name: 'Apple iPhone 13 Pro', description: 'Мощный смартфон с производительной камерой и A15 Bionic чипсетом.', quantity: 10 },
                { id: 6314, name: 'Asus ROG Phone 5', description: 'Геймерский смартфон с выдающейся производительностью.', quantity: 20 },
                { id: 8653, name: 'Huawei P40 Pro', description: 'Флагманский телефон с выдающейся камерой и Kirin 990 процессором.', quantity: 15 },
                { id: 8181, name: 'Lenovo Legion Phone Duel', description: 'Геймерский смартфон с высокой производительностью и игровыми функциями.', quantity: 10 },
                { id: 6979, name: 'LG Velvet', description: 'Стильный телефон с AMOLED', quantity: 10 },
                { id: 7632, name: 'Motorola Edge+', description: 'Производительный телефон с большим экраном и долгим временем работы от аккумулятора.', quantity: 20 },
                { id: 4768, name: 'Nokia 9 PureView', description: 'Известен своей пятикамерной системой для фотографий.', quantity: 10 },
                { id: 6012, name: 'OnePlus 9 Pro', description: 'Оптимизированный для игр смартфон с отличным дисплеем.', quantity: 20 },
                { id: 5476, name: 'OnePlus Nord N200', description: 'Доступный смартфон с 5G и длительным временем работы от батареи.', quantity: 15 },
                { id: 8407, name: 'Oppo Find X3 Pro', description: 'Имеет уникальный микроскопический объектив для макрофотографии.', quantity: 10 },
                { id: 5757, name: 'Poco X3 Pro', description: 'Бюджетный вариант с высокой производительностью.', quantity: 10 },
                { id: 5007, name: 'Realme GT', description: 'Предлагает мощную производительность по доступной цене.', quantity: 20 },
                { id: 4743, name: 'Samsung Galaxy A52', description: 'Средний класс с качественным экраном и камерой.', quantity: 15 },
                { id: 7844, name: 'Samsung Galaxy S21', description: 'Флагманский Android с высококачественным AMOLED', quantity: 20 },
                { id: 4293, name: 'Sony Xperia 1 III', description: 'Высококачественный смартфон с 4K дисплеем и фокусировкой глазом в камере.', quantity: 10 },
                { id: 9551, name: 'TCL 20 Pro 5G', description: 'Смартфон с 5G поддержкой и качественным дисплеем.', quantity: 10 },
                { id: 9997, name: 'Vivo X60 Pro', description: 'Смартфон с камерой с оптической стабилизацией изображения.', quantity: 15 },
                { id: 6487, name: 'Xiaomi Mi 11', description: 'Смартфон с Snapdragon 888 и высокой производительностью.', quantity: 20 },
                { id: 6019, name: 'ZTE Axon 30 Ultra', description: 'Флагманский телефон с множеством камер для разных сценариев.', quantity: 15 }
            ]
        };

        return data.items;
    } catch (error) {
        // Обработка ошибок при выполнении запроса
        console.error('Ошибка:', error);
        // Возврат пустых данных в случае ошибки
        return [];
    }
}

// Функция для добавления опций в выпадающий список
function populateDropdown(products) {
    const selectElement = document.getElementById('productName');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.name; // Используем имя товара в качестве значения
        option.textContent = product.name; // Используем имя товара для отображения
        selectElement.appendChild(option);
    });
}
