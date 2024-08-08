import { db, collection, addDoc, serverTimestamp, getDocs, onSnapshot, storage, ref, uploadBytes, getDownloadURL } from './firebase.js';

// HTML elements ko select karna
const form = document.querySelector("#product-form");
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDetail = document.querySelector("#product-detail");
const productImage = document.querySelector("#product-image");
const allProducts = document.querySelector(".allproducts");

// Firestore collection reference
const mycollectionreferences = collection(db, 'products');

// Function to render products
const renderProducts = async () => {
    try {
        // Products ko Firestore se get karna
        const querySnapshot = await getDocs(mycollectionreferences);
        allProducts.innerHTML = ''; // Purane products ko clear karna
        
        // Har document ko render karna
        querySnapshot.forEach((doc) => {
            const producT = doc.data();
            allProducts.innerHTML += `
                <div class="product-card">
                    ${producT.productImage ? `<img src="${producT.productImage}" alt="Product Image" style="max-width: 90%; height: auto%;">` : ''}
                    <h3>${producT.productName}</h3>
                    <p class="price">$${producT.productPrice}</p>
                    <p>${producT.productDetail}</p>
                </div>`;
        });
    } catch (error) {
        console.error("Products ko fetch karte waqt error: ", error);
    }
};

// Form submit hone par product add karna
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const imageFile = productImage.files[0];
    let imageUrl = null;

    if (imageFile) {
        try {
            // Image ko Firebase Storage par upload karna aur URL get karna
            const imageRef = ref(storage, 'images/' + imageFile.name);
            await uploadBytes(imageRef, imageFile);
            imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
            console.error("Image upload karte waqt error: ", error);
            return; // Agar image upload fail ho, to further processing ko roknay
        }
    }

    const myproduct = {
        productName: productName.value,
        productPrice: Number(productPrice.value),
        productImage: imageUrl, // Image ka URL agar available ho
        productDetail: productDetail.value,
        createdAt: serverTimestamp()  // Document create karte waqt timestamp save karna
    };

    try {
        // Firestore mein product ko add karna
        await addDoc(mycollectionreferences, myproduct);
        console.log("Document successfully written!");
        form.reset();
        await renderProducts(); // Product list ko refresh karna
    } catch (error) {
        console.error("Document add karte waqt error: ", error);
    }
});

// Initial load of products
renderProducts();

// Real-time updates ke liye
onSnapshot(mycollectionreferences, () => {
    renderProducts();
});

  
