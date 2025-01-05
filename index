<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IPPALIT - Поиск автозапчастей</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background-image: url('background.jpg'); /* Укажите путь к вашей картинке */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
        }
        header {
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 50px 0;
            text-align: center;
            margin-bottom: 20px;
        }
        header h1 {
            font-size: 3rem;
            margin: 0;
        }
        header p {
            font-size: 1.2rem;
        }
        nav {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 15px 0;
            text-align: center;
        }
        nav a {
            color: white;
            margin: 0 15px;
            text-decoration: none;
            font-weight: bold;
            text-transform: uppercase;
        }
        nav a:hover {
            text-decoration: underline;
        }
        .container {
            max-width: 1000px;
            margin: 50px auto;
            padding: 40px;
            background: rgba(0, 0, 0, 0.5); /* Более темный полупрозрачный фон */
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px); /* Размытие фона, чтобы текст был читаемым */
            color: #fff; /* Текст будет белым для контраста */
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s forwards;
        }
        .container:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
        }
        .container:nth-child(1) {
            animation-delay: 0.2s;
        }
        .container:nth-child(2) {
            animation-delay: 0.4s;
        }
        .container:nth-child(3) {
            animation-delay: 0.6s;
        }
        .container:nth-child(4) {
            animation-delay: 0.8s;
        }
        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        h2 {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #fff;
        }
        .cta {
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            text-align: center;
            padding: 30px;
            margin: 50px 0;
            border-radius: 10px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
        }
        .cta h2 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .cta p {
            font-size: 1.2rem;
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-group input, .form-group textarea, .form-group button {
            width: 100%;
            padding: 12px;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            margin-bottom: 15px;
        }
        .form-group button {
            background-color: #333;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .form-group button:hover {
            background-color: #555;
        }
        footer {
            text-align: center;
            padding: 30px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
        }
        footer p {
            font-size: 1.1rem;
        }
        .contacts-list {
            list-style-type: none;
            padding: 0;
        }
        .contacts-list li {
            margin-bottom: 15px;
        }
        .review-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        .review-link img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
        }
        .review-link a {
            font-size: 20px;
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s ease;
        }
        .review-link a:hover {
            color: #f39c12; /* Яркий цвет для подсветки ссылки */
        }
        .review-link i {
            font-size: 30px;
            color: #f39c12;
        }

        /* Стиль для кнопки ссылки */
        .cta-link {
            color: white;
            background-color: #333;
            padding: 10px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }

        .cta-link:hover {
            background-color: #555;
        }

        /* Новые стили для телефонов и Telegram */
        .phone-link {
            color: white; /* Цвет по умолчанию */
            transition: color 0.3s ease; /* Плавный переход */
        }

        .phone-link:hover {
            color: #f39c12; /* Оранжевый цвет при наведении */
        }
    </style>
</head>
<body>
    <header>
        <h1>IPPALIT</h1>
        <p>Поиск и подбор автозапчастей быстро и надёжно</p>
    </header>
    <nav>
        <a href="#about">О нас</a>
        <a href="#services">Наши услуги</a>
        <a href="#request">Оставить заявку</a>
        <a href="#reviews">Отзывы</a>
        <a href="#contacts">Контакты</a>
    </nav>

    <div class="container" id="about">
        <h2>О нас</h2>
        <p>Мы — команда профессионалов, занимающаяся подбором и поставкой автозапчастей на протяжении более 10 лет. За это время мы зарекомендовали себя как надежного партнера по всей России и СНГ, предоставляя нашим клиентам качественные запчасти и отличное обслуживание.</p>
        <p>Мы гордимся тем, что наша работа построена на принципах честности и прозрачности. Наши клиенты всегда могут быть уверены в том, что получат качественные и проверенные запчасти, а также профессиональную консультацию. Мы нацелены на долгосрочное сотрудничество и доверие, и работаем только с крупнейшими складами, которые отвечают за качество своей продукции.</p>
        <p>Сейчас мы активно расширяем свою деятельность на территории новых регионов — Херсонская и Запорожская области, где открыты наши пункты выдачи в Новой Каховке и Дудчино. Мы обеспечиваем нашим клиентам прямой доступ к качественным автозапчастям, что позволяет сократить время доставки и снизить затраты.</p>
        <p>Мы стремимся к тому, чтобы каждый наш клиент получал наилучший сервис, и уверены, что качество обслуживания должно быть на первом месте. Мы тщательно подходим к выбору поставщиков и всегда готовы предложить самые выгодные условия для наших клиентов.</p>
        <p>Будь то новые или б/у запчасти, мы гарантируем их полную совместимость с вашим автомобилем. Мы также работаем с автомобилями всех марок и моделей, предоставляя полный спектр услуг по подбору автозапчастей.</p>
        <p>Наши специалисты всегда готовы помочь вам с любым вопросом, будь то консультация по выбору детали или помощь в оформлении заказа. Мы ценим каждого клиента и делаем все возможное, чтобы ваша покупка была максимально удобной и выгодной.</p>
        <p>Мы не просто продаем автозапчасти — мы строим долгосрочные отношения с нашими клиентами, основанные на доверии и уважении. С нами легко работать, а наш сервис всегда на высшем уровне!</p>
    </div>

    <div class="container" id="services">
        <h2>Наши услуги</h2>
        <h3>Быстрый поиск и подбор новых и б/у запчастей</h3>
        <p>- Удобный сервис для всех.</p>
        <h3>Распознание VIN с фотографии СТС</h3>
        <p>- Просто пришлите фото, бот запросит оставшуюся информацию.</p>
    </div>

    <div class="cta">
        <h2>Акция!</h2>
        <p>Первая заявка бесплатно!</p>
        <p>Оформите поиск запчасти прямо сейчас и получите скидку 10% на следующую заявку.</p>
    </div>

    <div class="container" id="request">
        <h2>Оставьте заявку</h2>
        <div class="review-link">
            <i class="fas fa-hand-point-right"></i>
            <a href="https://t.me/ippalitzapchasti" target="_blank">Перейти для оформления заявки</a>
        </div>
    </div>

    <div class="container" id="reviews">
        <h2>Отзывы наших клиентов</h2>
        <p>Здесь будут отзывы наших клиентов.</p>
        <div class="review-link">
            <i class="fas fa-comment-dots"></i>
            <a href="javascript:void(0);" onclick="alert('Ваш отзыв принят!')">Оставить отзыв</a>
        </div>
    </div>

    <div class="container" id="contacts">
        <h2>Контакты</h2>
        <ul class="contacts-list">
            <li><strong>Пункт выдачи:</strong> Дудчино, Новая Каховка</li>
            <li><strong>Телефон:</strong> <a href="tel:+79901744516" class="phone-link">+7 (990) 174-45-16</a> (Татьяна)</li>
            <li><strong>Менеджер ИППОЛИТ:</strong> <a href="tel:+79901658140" class="phone-link">+7 990 165 8140</a></li>
            <li><strong>Telegram:</strong> <a href="https://t.me/ippalitzapchasti" class="phone-link" target="_blank">@ippalitzapchasti</a></li>
        </ul>
    </div>

    <footer>
        <p>&copy; 2025 IPPALIT. Все права защищены.</p>
    </footer>
</body>
</html>
