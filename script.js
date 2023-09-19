$(document).ready(function() {
    var $todoInput = $('#todo-input');
    var $addButton = $('#add-button');
    var $todoList = $('#todo-list');
    var $allButton = $('#all-button');
    var $activeButton = $('#active-button');
    var $completedButton = $('#completed-button');
    var $clearCompletedButton = $('#clear-completed-button');
    
    var todos = [];



    // Thêm task
    $addButton.click(function() {
        var todoText = $todoInput.val().trim();
        if (todoText !== '') {
            todos.push({ text: todoText, completed: false });
            $todoInput.val('');
            updateTodoList();
        }
    });

    function updateTodoList() {
        $todoList.empty();
        $.each(todos, function(index, todo) {
            var liClass = todo.completed ? 'completed' : '';
            var li = $('<li><span class="' + liClass + '">' + todo.text + '</span> <div><button style="color: white; background-color: green;" class="toggle-button">Done</button><button style="color: white; background-color: red;" class="delete-button">Del</button></div></li>');
            $todoList.append(li);
        });
    }

    // Đánh dấu công việc hoàn thành
    $todoList.on('click', '.toggle-button', function() {
        var index = $(this).closest('li').index();
        todos[index].completed = !todos[index].completed;
        updateTodoList();
    });

    // Xóa công việc
    $todoList.on('click', '.delete-button', function() {
        var index = $(this).closest('li').index();
        todos.splice(index, 1);
        updateTodoList();
    });

    // Lọc công việc theo trạng thái
    $allButton.click(function() {
        filterTodos('all');
    });

    $activeButton.click(function() {
        filterTodos('active');
    });

    $completedButton.click(function() {
        filterTodos('completed');
    });

    $clearCompletedButton.click(function() {
        todos = todos.filter(function(todo) {
            return !todo.completed;
        });
        updateTodoList();
    });

    function filterTodos(filterType) {
        $allButton.removeClass('active');
        $activeButton.removeClass('active');
        $completedButton.removeClass('active');

        if (filterType === 'all') {
            $allButton.addClass('active');
            updateTodoList();
        } else if (filterType === 'active') {
            $activeButton.addClass('active');
            var activeTodos = $.grep(todos, function(todo) {
                return !todo.completed;
            });
            displayFilteredTodos(activeTodos);
        } else if (filterType === 'completed') {
            $completedButton.addClass('active');
            var completedTodos = $.grep(todos, function(todo) {
                return todo.completed;
            });
            displayFilteredTodos(completedTodos);
        }
    }

    function displayFilteredTodos(filteredTodos) {
        $todoList.empty();
        $.each(filteredTodos, function(index, todo) {
            var liClass = todo.completed ? 'completed' : '';
            var li = $('<li><span class="' + liClass + '">' + todo.text + '</span><div><button style="color: white; background-color: green;" class="toggle-button">Done</button><button style="color: white; background-color: red;" class="delete-button">Del</button></div></li>');
            $todoList.append(li);
        });
    }

    // Hiển thị danh sách công việc ban đầu
    updateTodoList();
});
