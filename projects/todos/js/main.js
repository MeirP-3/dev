var KEY_TODOS = 'todos';
var ACTIVE = 'active';
var ARCHIVED = 'archived';
var ALL = 'all';
var gState;
var gCurrFilter = ACTIVE;
localStorage.clear();

function getInitialState() {
    var state = loadFromStorage(KEY_TODOS);
    if (!state) {
        state = {
            todos: getInitialTodos(),
            archivedTodos: []
        }
    }
    return state;
}

function init() {
    gState = getInitialState();
    renderTodos(gState.todos);
}

function getInitialTodos() {
    var todos = [];
    todos.push(getTodo('Learn Javascript'));
    todos.push(getTodo('Practice HTML'));
    todos.push(getTodo('Master CSS'));
    return todos;
}

function getTodo(txt) {
    return { txt: txt, isDone: false }
}

function renderTodos(todos) {
    var elTodos = document.querySelector('.todos');

    var strHtmls = todos.map(function (todo, idx) {
        var strChecked = (todo.isDone) ? ' checked ' : '';
        return `<li>
                    <input type="checkbox" id="c${idx}" ${strChecked} onchange="todoClicked(${idx})" />
                    <label for="c${idx}"><span></span>${todo.txt}</label>
                    <button class="change-order">
                    <i class="fa fa-sort-asc"></i>
                    <i class="fa fa-sort-desc"></i>
                    </button>
                </li>`;
    });

    elTodos.innerHTML = strHtmls.join('');
}

function todoClicked(idx) {
    var todo = gState.todos[idx];
    var len = gState.todos.length;
    switch (gCurrFilter) {
        case ARCHIVED:
            gState.todos.push(gState.archivedTodos.splice(idx, 1)[0]);
            todo = gState.todos[len];
            todo.isDone = !todo.isDone;
            checkFilterButton(ACTIVE);
            setFilter(ACTIVE);
            break;
        case ALL:
            if (idx >= len) {
                gState.todos.push(gState.archivedTodos.splice(idx - len, 1)[0]);
                todo = gState.todos[len];
                todo.isDone = !todo.isDone;
                checkFilterButton(ACTIVE);
                setFilter(ACTIVE);
                break;
            }
        case ACTIVE:
            todo.isDone = !todo.isDone;
            break;
    }
    saveToStorage(KEY_TODOS, gState);
}

function checkFilterButton(filter) {
    var elFilter = document.querySelector(`[value=${filter}]`);
    document.querySelector(`[value=${gCurrFilter}]`).checked = false;
    elFilter.checked = true;
}

function archiveDone() {
    gState.todos = gState.todos.filter(function (todo) {
        if (todo.isDone) gState.archivedTodos.push(todo);
        return !todo.isDone;
    })
    renderTodos(gState.todos);
    saveToStorage(KEY_TODOS, gState);
}

function addTodo() {
    var txt = prompt('New Todo');
    var todo = getTodo(txt);
    gState.todos.push(todo);
    renderTodos(gState.todos);
    saveToStorage(KEY_TODOS, gState);
}

function setFilter(filter) {
    var todos;
    if (filter) {
        switch (filter) {
            case ACTIVE:
                todos = gState.todos
                gCurrFilter = ACTIVE;
                break;
            case ARCHIVED:
                todos = gState.archivedTodos
                gCurrFilter = ARCHIVED;
                break;
            case ALL:
                todos = gState.todos.concat(gState.archivedTodos);
                gCurrFilter = ALL;
                break;
        }
        renderTodos(todos);
    }
}