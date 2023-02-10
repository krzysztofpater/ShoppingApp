const plus = document.querySelector(".add__btn--icon");
const del = document.querySelector(".btn__delete");
const send = document.querySelector(".btn__send");

const mainInput = document.querySelector(".add__input");
const mainList = document.querySelector(".list");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

//create a place in localstorage where list of shopping products will be hold
let list = JSON.parse(localStorage.getItem("list")) || [];

if (localStorage.getItem("list")) {
	list.map((task) => {
		createTask(task);
	});
}

plus.addEventListener("click", (e) => {
	e.preventDefault();

	const inputValue = mainInput.value;

	if (inputValue == "") {
		return;
	}

	//create an object with a single product. Iniqueness of ID id provided through the time stamp
	const task = {
		id: new Date().getTime(),
		name: inputValue,
	};
	//adding a product to the array in localstorage
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

//day of the week from the < POST na adres ‘/grocery/<day> > - I'm not exactly sure what <day> element should be...
const dayArr = [
	"sunday",
	"monday",
	"tuesday",
	"wednsday",
	"thursday",
	"friday",
	"saturday",
];
const day = dayArr[new Date().getDay()];

//sending list array using POST method
send.addEventListener("click", () => {
	fetch(`/grocery/${day}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			items: list,
		}),
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(
					`Server responded with status code: ${response.status}`
				);
			}
		})
		.then((data) => {
			console.log("Success:", data);
		})
		.catch((error) => {
			console.error("Error:", error);
		})
		//info window
		.then(openModal);
});

const openModal = () => {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};
const closeModal = () => {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

document.addEventListener("click", closeModal);
