// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

// frappe.ui.form.on("post_json", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("post_json", {
	refresh(frm) {
        // frm.set_value("username", "busanaremaja");
        // frm.set_value("password", "SaveBray2018");
	},

    post_json: function(frm) {
        console.log("::::::call method::::::::::", frm);
        frappe.call({
            method:
                "costing_accessories.costing_for_accessories.doctype.post_json.post_json.post_json",
            type: "POST",
            // type: "GET",
            // args: {
            //     date: frappe.datetime.nowdate(),
            // },
            // // disable the button until the request is completed
            // btn: $('.primary-action'),
            // // freeze the screen until the request is completed
            // freeze: true,
            callback: function(r) {
                // on success
                console.log("::::::r.message::::::::::",r.message);

                if (r.message) {
                    const msg = r.message;
                    // console.log(msg);
                    // frm.set_value("log", msg);
                    frm.set_value("log", msg);
                    
                    // const msg = r.message;
                    // console.log(msg);
                    // const json = JSON.parse(msg);
                    // console.log(json)
                    // // frm.set_value("log", msg);
                    // // frm.set_value("log", json);
                    // frm.set_value("log", JSON.stringify(json));
                    // // frm.set_value("log", JSON.stringify(msg));
                }
            },
            error: (r) => {
                // on error
            }
        });
        
    }

});
