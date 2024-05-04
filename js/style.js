// JavaScript для открытия/закрытия списка только при клике на кнопку
document.addEventListener('DOMContentLoaded', function() {
    var dropdown = document.querySelector('.dropdown');
    var dropbtn = document.querySelector('.dropbtn');

    dropbtn.addEventListener('click', function() {
        dropdown.classList.toggle('active');
        var dropdownContent = dropdown.querySelector('.dropdown-content');
        dropdownContent.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var dropbtn = document.querySelector('.dropbtn');
    dropbtn.addEventListener('click', function() {
        var arrow = dropbtn.querySelector('.arrow');
        arrow.classList.toggle('rotated');
    });
});


(function() {
    let items = document.querySelectorAll('.tovar');
    let filterItems = document.querySelectorAll('.filter__item');

    function FilterProduct() {
        this.run = function() {
            filterItems.forEach(function(item) {
                item.addEventListener('click', function() {
                    filterItems.forEach(function(filterItem) {
                        filterItem.classList.remove('activ');
                    });
                    this.classList.add('activ');
                    
                    let filterValue = this.dataset.filter;
                    items.forEach(function(product) {
                        let productPrice = parseInt(product.querySelector('.tovar__text').textContent.replace(/\D/g,''));
                        if (filterValue === 'all') {
                            product.style.opacity = '0'; // Задаємо нульову прозорість для ефекту зникнення
                            setTimeout(function() {
                                product.style.display = 'flex'; // Показуємо товари
                                product.style.opacity = '1'; // Додаємо повернення прозорості
                            }, 300);
                        } else if (filterValue === 'starting-prise' && productPrice <= 1500) {
                            product.style.opacity = '0';
                            setTimeout(function() {
                                product.style.display = 'flex';
                                product.style.opacity = '1';
                            }, 300);
                        } else if (filterValue === 'average-prise' && productPrice > 1500 && productPrice <= 3000) {
                            product.style.opacity = '0';
                            setTimeout(function() {
                                product.style.display = 'flex';
                                product.style.opacity = '1';
                            }, 300);
                        } else if (filterValue === 'high-prise' && productPrice > 3000) {
                            product.style.opacity = '0';
                            setTimeout(function() {
                                product.style.display = 'flex';
                                product.style.opacity = '1';
                            }, 300);
                        } else {
                            product.style.display = 'none';
                        }
                    });
                });
            });
        }
    }

    new FilterProduct().run();
})();

document.addEventListener('DOMContentLoaded', function() {
    const dropdownContent = document.querySelector('.dropdown-content'); // Отримуємо вміст dropdown
    const items = document.querySelectorAll('.tovar'); // Отримуємо всі елементи товарів
    let defaultOrder = Array.from(items); // Зберігаємо початковий порядок елементів

    // Функція сортування товарів
    function sortItems(event) {
        const sortBy = event.target.id; // Отримуємо ID натиснутого елемента dropdown-content
        let sortedItems;

        if (sortBy === 'default') {
            sortedItems = defaultOrder; // Використовуємо початковий порядок
        } else if (sortBy === 'lowToHigh') {
            sortedItems = Array.from(items).sort((a, b) => a.dataset.price - b.dataset.price); // Сортуємо за зростанням
        } else if (sortBy === 'highToLow') {
            sortedItems = Array.from(items).sort((a, b) => b.dataset.price - a.dataset.price); // Сортуємо за спаданням
        }

        // Додаємо відсортовані товари в контейнер
        sortedItems.forEach(item => {
            item.parentNode.appendChild(item);
        });
    }

    // Додаємо обробник подій для кожного елемента в dropdown-content
    dropdownContent.addEventListener('click', sortItems);
});

document.addEventListener('DOMContentLoaded', function() {
    const showMoreButton = document.querySelector('.show__more_button');
    const products = document.querySelectorAll('.tovar');
    const productsToShow = 3; // Количество товаров, которые будут показываться за раз
    let visibleCount = productsToShow; // Начальное количество видимых товаров

    // Функция показа следующих товаров
    function showNextProducts() {
        for (let i = visibleCount; i < visibleCount + productsToShow && i < products.length; i++) {
            products[i].style.display = 'flex'; // Показываем товар
        }
        visibleCount += productsToShow; // Увеличиваем количество видимых товаров

        // Скрыть кнопку, если показаны все товары
        if (visibleCount >= products.length || visibleCount >= 9) {
            showMoreButton.style.display = 'none';
        }
    }

    // При нажатии на кнопку "Дивитись ще"
    showMoreButton.addEventListener('click', showNextProducts);

    // Изначально скрываем все товары, кроме первых `productsToShow`
    for (let i = productsToShow; i < products.length; i++) {
        products[i].style.display = 'none';
    }

    // Показать кнопку, если есть больше товаров для показа
    if (products.length > productsToShow) {
        showMoreButton.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const submitButtons = document.querySelectorAll('.tovar .submit'); // Получаем все кнопки "Замовити"
    const basketCount = document.querySelector('.basket-count'); // Элемент с числом товаров

    const basket = {}; // Объект для хранения количества товаров

    // Функция обработки нажатия на кнопку "Замовити"
    function handleOrderButtonClick(event) {
        const button = event.target;
        const tovarBlock = button.closest('.tovar');
        const productId = tovarBlock.dataset.productId; // Получаем ID товара из data-атрибута

        if (!basket[productId]) {
            basket[productId] = 0; // Инициализируем счетчик для этого товара, если его еще нет
        }

        if (button.classList.contains('active')) {
            // Уменьшаем счетчик и обновляем текст
            basket[productId]--;
        } else {
            // Увеличиваем счетчик и обновляем текст
            basket[productId]++;
        }

        // Обновляем текст счетчика
        updateBasketCount();

        // Переключаем класс активности кнопки
        button.classList.toggle('active');
    }

    // Функция обновления текста счетчика
    function updateBasketCount() {
        let totalCount = 0;

        // Считаем общее количество товаров
        for (let productId in basket) {
            totalCount += basket[productId];
        }

        // Отображаем количество товаров и делаем видимым, если количество больше 0
        if (totalCount > 0) {
            basketCount.textContent = totalCount;
            basketCount.style.visibility = 'visible';
        } else {
            basketCount.style.visibility = 'hidden';
        }
    }

    // Назначаем обработчик события для каждой кнопки "Замовити"
    submitButtons.forEach(function(button) {
        button.addEventListener('click', handleOrderButtonClick);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const orderButtons = document.querySelectorAll('.submit');
    const modalBackground = document.querySelector('.modalBackground');

    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productContainer = this.closest('.tovar');
            const productName = productContainer.querySelector('.tovar__title').textContent;
            const productPrice = productContainer.querySelector('.tovar__text').textContent;
            const productImage = productContainer.querySelector('.tovar__image').src;

            const modalWindow = document.querySelector('.modalWindow');
            const modalImage = modalWindow.querySelector('.modal__image');
            const modalTitle = modalWindow.querySelector('.modal__title');
            const modalPrice = modalWindow.querySelector('.modal__price');

            modalImage.src = productImage;
            modalTitle.textContent = productName;
            modalPrice.textContent = productPrice;

            modalBackground.style.display = 'block';
        });
    });

    const modalClose = document.querySelector('.modalClose');
    modalClose.addEventListener('click', function() {
        modalBackground.style.display = 'none';
    });
});