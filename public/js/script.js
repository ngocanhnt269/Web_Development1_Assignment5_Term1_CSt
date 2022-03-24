let http = new XMLHttpRequest();

http.open('get', '/products/products.json', true);


// next i will send the request.
http.send();

http.onload = function () {
	// Inside the function i need to check the readystate and status properties.
	if (this.readyState == 4 && this.status == 200) {

		let products = JSON.parse(this.responseText);

		// next i need an empty variable to add the incoming data.
		let output = "";

		for (let item of products) {
			output += `
				<div class="product">
					<img src="${item.image}" alt="${item.image}">
					<p class="title">${item.title}</p>
					<p class="description">
					<span><b> Product details: </b></span>
					${item.description}</p>
					<p class="material">
					<span><b> Material: </b></span>
					${item.material}</p>
					<p class="price">
					<span><b> Price: </b></span>
						<span>&dollar;</span>
						<span>${item.price}</span>
					</p>
					<p class="cart">Add to cart <i class="bx bx-cart-alt"></i></p>
				</div>
			`;
		}
		/* and last i target the products container and add the data that the
		output variable holds. */
		document.querySelector(".products").innerHTML = output;
	}
}