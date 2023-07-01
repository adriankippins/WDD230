document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('d-card-view').addEventListener("click", () => updateView("grid"));
    document.getElementById('d-list-view').addEventListener("click", () => updateView("list"));

    let displayArea = document.querySelector(".disc-main-container section");

    function updateView(mode) {
        if (mode === "grid") {
            displayArea.classList.remove("list-view");
            displayArea.classList.add("card-view");
        } else {
            displayArea.classList.remove("card-view");
            displayArea.classList.add("list-view");
        }
    }

    let url = "https://adriankippins.github.io/WDD230/scripts/chamber-directory.json";

    async function fetchData() {
        let response = await fetch(url);
        let data = await response.json();
        let sortedData = data.business.sort((a, b) => membershipOrder.indexOf(a.membership) - membershipOrder.indexOf(b.membership));
        populateBusiness(sortedData);
    }

    let membershipOrder = ["gold", "silver", "bronze", "np"];

    function populateBusiness(business) {
        let cardArea = document.querySelector(".disc-main-container section");

        business.forEach((business) => {
            let businessCard = document.createElement("section");
            let businessInfo = document.createElement("div");
            let logo = document.createElement("img");
            let businessName = document.createElement("h2");
            let membershipType = document.createElement("div");
            let businessAddress = document.createElement("p");
            let businessContact = document.createElement("p");
            let businessWebsite = document.createElement("a");

            // Populate the elements
            businessName.textContent = `${business.name}`;
            membershipType.textContent = `${business.membership.toUpperCase()}`;
            businessAddress.textContent = `${business.address}`;
            businessContact.textContent = `${business.phone}`;
            businessWebsite.textContent = `${business.url}`;
            
            logo.setAttribute("src", `images/${business.img}`);
            logo.setAttribute("alt", `Logo of ${business.name}`)
            membershipType.setAttribute("class", "membership-type");
            businessName.setAttribute("class", "business-name")
            businessAddress.setAttribute("class", "address");
            businessContact.setAttribute("class", "contact");
            businessWebsite.setAttribute("href", `https://${business.url}`);
            businessWebsite.setAttribute("target", "_blank");

            businessCard.appendChild(logo);
            businessInfo.appendChild(businessName);
            businessInfo.appendChild(membershipType);
            businessCard.appendChild(businessInfo);
            businessCard.appendChild(businessAddress);
            businessCard.appendChild(businessContact);
            businessCard.appendChild(businessWebsite);

            cardArea.appendChild(businessCard);
        })
    }
    fetchData().then(() => updateView("grid"));
});