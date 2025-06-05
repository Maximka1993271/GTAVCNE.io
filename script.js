document.addEventListener("DOMContentLoaded", function () {
    // Функция для разрешения контекстного меню
    function enableContextMenu() {
        document.removeEventListener("contextmenu", disableContextMenuExceptButtons);
    }

    // Функция для разрешения копирования контента
    function enableCopyContent() {
        document.removeEventListener("copy", disableCopyContent);
    }

    // Инициализация разрешений
    enableContextMenu();
    enableCopyContent();
});
