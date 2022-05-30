


const forms = {
	common: document.querySelectorAll("form")[0],
	wifi: document.querySelectorAll("form")[1],
	selection: "common",
	submit: (selection) => {
		let data = "";
		if(selection === "common"){
			data = forms.common.children[0].value;
		}else{
			let ssid = forms.wifi.children['SSID'].value ;
			let password = forms.wifi.children['password'].value;
			let auth = forms.wifi.children['authentication-type'].value;
			if(auth.length == 0)
				auth = "WPA";

			data = `WIFI:T:${auth};S:${ssid};P:${password};;`;
		}
		generateQRCode(data);
	}
}


const loadQRCODE = (loader,img) => {

	loader.innerHTML = "";
	loader.appendChild(img);

}

const generateQRCode = (data) => {
	let api_url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
	let text = data;
	let loader = document.querySelector(".preloader");

	
	if(text.length === 0){
		alert("input must not be empty o");
	}else{
		// create and set the spinner image dimensions
		var img = new Image();
		img.src = "assets/icons/spinner.gif";
		
		img.style.width = "55px";
		img.style.height = "55px";

		// clear and set the preloader 
		loader.innerHTML = "";
		loader.appendChild(img);


		const imageUrl = api_url+text;

		fetch(imageUrl)
			.then((response) => response.blob())
			.then((blob) => {
				console.log(blob);
				const source = URL.createObjectURL(blob);
				const code_image = new Image();
				code_image.src = source;
				loadQRCODE(loader,code_image);
			});

	}		
}

const resetCommon = () => {
	forms.common.style.display  = "block";
	forms.wifi.style.display = "none";
	forms.selection = "common";
}

const setCommonAttrib = (type,holder) => {
	forms.common.children[0].type = type;
	forms.common.children[0].placeholder = holder;
}


const wifi = () => {
	console.log("wifi form");
	let wifiBtn = document.querySelector("#wifi");
	forms.common.style.display  = "none";
	forms.wifi.style.display = "block";
	forms.selection = "wifi";
	forms.wifi.children[1].onfocus = () => {
		if(forms.wifi.children[1].value.length == 0){
			forms.wifi.children[1].value = "WPA";
		}
	};

}

const telephone = () => {
	resetCommon();
	setCommonAttrib("tel","Phone Number eg +234 123 4567 890");
}

const email = () => {
	resetCommon();
	setCommonAttrib("email","Enter Email");
}

const url = () => {
	resetCommon();
	setCommonAttrib("url","https://");

	forms.common.children[0].onfocus = () => {
		if(forms.common.children[0].value.length == 0){
			forms.common.children[0].value = "https://";
		}
	};
}


document.querySelector("#genBtn").addEventListener("click",()=> {
	forms.submit(forms.selection);	
})


// wifi support format
/*

	AUTHENTICATION TYPES: WPA-EAP, WPA2-EAP, nopass( NO password)
	format WIFI:T:<AUTHENTICATION TYPE>;S:<SSID>;P:<PASSWORD>;;
	example WIFI:T:WPA;S:Preston;P:pa43jfe;;
*/