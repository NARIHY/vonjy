// resources/js/echo.js ou dans un composant React
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: 'your_key',
    cluster: 'mt1',
    forceTLS: true,
});

export default echo;
