// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

frappe.ui.form.on("Foam Price", {
	refresh(frm) {
        set_price_visibility(frm);
	},

    type_of_price(frm) {
        set_price_visibility(frm);
    },

    
    before_save(frm) {
        var name = frm.doc.name;
        var article = frm.doc.article;
        var thickness = frm.doc.thickness;
        var ttk = article +" "+ thickness +"MM";
        var type_of_price = frm.doc.type_of_price;

        // Insert Material Article
        set_material_article(ttk);
    },

    after_save(frm) {
        var name = frm.doc.name;
        var article = frm.doc.article;
        var thickness = frm.doc.thickness;
        var ttk = article +" "+ thickness +"MM";
        var type_of_price = frm.doc.type_of_price;

        // Insert Material Article
        frappe.db.exists('Material Article', ttk)
        .then(exists => {
            console.log(exists); // true
            console.log(ttk)
            if (!exists) {
                frappe.db.insert({
                    doctype: 'Material Article',
                    article: ttk
                }).then(doc => {
                    console.log(doc);

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
                });
            } else {
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
            }
        });
    },
    
});

function set_material_article(article){
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
}

function set_price_visibility(frm){
    var type_of_price = frm.doc.type_of_price;
    if (type_of_price == "Per Mili Meter") {
        frm.set_df_property("price_per_mm", "hidden", 0);
        frm.set_df_property("price_custom", "hidden", 1);
    } else {
        frm.set_df_property("price_per_mm", "hidden", 1);
        frm.set_df_property("price_custom", "hidden", 0);
    }
}
