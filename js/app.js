
const ulNav = document.getElementById("navbar__list");
const sectionList = document.querySelectorAll("section");
const ulFrag = document.createDocumentFragment();
const divContainer = document.createElement("div"); //a container div for list items inside the unordered list
let activeSection = new Array(); //array to include the avtice section if there is one
let navListItems = new Array(); //array to include all List Items
divContainer.setAttribute("class", "item_list_container");

sectionList.forEach((item, index) => {
    const liItem = document.createElement("li");
    liItem.innerText = item.getAttribute("data-nav");
    navListItems[index] = liItem;
    liItem.addEventListener("click", function () {
        item.scrollIntoView({ behavior: "smooth" });
    });
    ulFrag.append(liItem);
});
//alert(navListItems);
divContainer.appendChild(ulFrag);
ulNav.append(divContainer);

document.addEventListener("scroll", function () {
    if (window.pageYOffset > 250) {
        sectionList.forEach((item, i) => {
            //if half or more of the section vesible then highlight the corresponding list item in the
            if (item.getBoundingClientRect().top <= item.offsetHeight / 2 && item.getBoundingClientRect().top > -item.offsetHeight / 2) {
                //if there is not a highlighted section in the nav bar yet
                if (activeSection.length === 0) {
                    activeSection[0] = navListItems[i];
                    const temp = navListItems[i];
                    temp.classList.add("active_link");
                    //move the highlighting from the past section to the current one
                } else {
                    activeSection[0].classList.remove("active_link");
                    activeSection[0] = navListItems[i];
                    navListItems[i].classList.add("active_link");
                }
            }
        });
        //in case you went up to the top of the page and the first section have to be unhighlighted
    } else {
        if (activeSection.length > 0) {
            activeSection[0].classList.remove("active_link");
        }
    }
});
