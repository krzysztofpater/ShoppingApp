const plus = document.querySelector(".add__btn--icon");
const del = document.querySelector(".btn__delete");
const send = document.querySelector(".btn__send");

const mainInput = document.querySelector(".add__input");
const mainList = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list")) || [];

if (localStorage.getItem("list")) {
	list.map((task) => {
		createTask(task);
	});
}

plus.addEventListener("click", (e) => {
	// e.preventDefalult();

	const inputValue = mainInput.value;

	if (inputValue == "") {
		return;
	}

	const task = {
		id: new Date().getTime(),
		name: inputValue,
	};
	list.push(task);
	localStorage.setItem("list", JSON.stringify(list));

	createTask(task);

	mainInput.value = "";
});

mainList.addEventListener("click", (e) => {
	if (
		e.target.classList.contains("btn__delete") ||
		e.target.parentElement.classList.contains("btn__delete")
	) {
		const taskId = e.target.closest(".list__item").id;
		removeTask(taskId);
	}
});

function createTask(task) {
	const listEl = document.createElement("div");

	listEl.setAttribute("id", task.id);

	const listElMArkup = `
    <div class="list__item" id='${task.id}'>
                    <div class="list__item--name">${task.name}</div>
                    <button class="btn__delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div class="line"></div>
    `;

	listEl.innerHTML = listElMArkup;
	mainList.appendChild(listEl);
}

function removeTask(taskId) {
	document.getElementById(taskId).remove();

	list = list.filter((task) => task.id !== parseInt(taskId));

	localStorage.setItem("list", JSON.stringify(list));
}
