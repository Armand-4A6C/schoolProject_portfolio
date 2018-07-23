const dropdownUl = document.querySelectorAll(".dropdown-ul");
let tentSecondPreventRemove = 0
let tentTimeOut;

function ControlFocusDropdown(itemNr) {
    // set prevent remove var
    tentSecondPreventRemove = 1;

    // add next focus class
    AddClass(itemNr);

    // control preventRemove
    tentTimeOut = setTimeout(function () {
        tentSecondPreventRemove = 0;
        clearTimeout(tentTimeOut);
    }, 5);
}

function ControlBlurDropdown(itemNr) {
    setTimeout(function () {
        if (tentSecondPreventRemove == 0) {
            RemoveClass(itemNr);
        }
    }, 5);
}

function ControlOffClick() {
    for (let i = 0; i < dropdownUl.length; i++) {
        RemoveClass(i);
    }
}

function RemoveClass(itemNr) {
    document.querySelectorAll(".dropdown-ul")[itemNr].classList.remove("clicked-dropdown");
}

function AddClass(itemNr) {
    document.querySelectorAll(".dropdown-ul")[itemNr].classList.add("clicked-dropdown");
}

// add focus and unfocus events to (.dropdown-ul)
function SetEventListeners() {
    // control Offclick
    document.body.click(function() { controlOffClick() });

    for (let i = 0; i < dropdownUl.length; i++) {

        // set OnClick EventListeners
        dropdownUl[i].addEventListener('click', function(){ControlFocusDropdown(i)});

        // Set Dropdown-Title eventListeners
        const dropdownTitle = dropdownUl[i].querySelector(".dropdown-title");
        dropdownTitle.addEventListener('focus', function(){ControlFocusDropdown(i)});
        dropdownTitle.addEventListener('blur', function(){ControlBlurDropdown(i)});
        dropdownTitle.setAttribute('tabindex', '0');

        // set childEventListeners
        const dropdownUl_Li_A = dropdownUl[i].querySelectorAll("LI A");
        for (let ii = 0; ii < dropdownUl_Li_A.length; ii++) {
            dropdownUl_Li_A[ii].addEventListener('focus', function(){ControlFocusDropdown(i)});
            dropdownUl_Li_A[ii].addEventListener('blur', function(){ControlBlurDropdown(i)});
            dropdownUl_Li_A[ii].setAttribute('tabindex', '0');
        }

        // set eventListeners to close last column before jumping to the next
        let lastColumnId = dropdownUl_Li_A.length - 1;
        dropdownUl_Li_A[ lastColumnId ].addEventListener('blur', function() {
            RemoveClass(i);
        });
    }
}

SetEventListeners();
