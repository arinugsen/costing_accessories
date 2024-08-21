// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

frappe.ui.form.on("Material Price", {
	refresh(frm) {

	},

    
    after_save(frm) {
        var article = frm.doc.article;

        // Insert Material Article
        frappe.db.exists('Material Article', article)
        .then(exists => {
            console.log(exists); // true
            console.log(article)
            if (!exists) {
                frappe.db.insert({
                    doctype: 'Material Article',
                    article: article
                }).then(doc => {
                    console.log(doc);
                });
            }
        });
    },
});
