// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

frappe.ui.form.on("Buyer Specification", {
	refresh(frm) {
        
        frm.set_value("size_range_1", "XS")
        frm.set_value("size_range_2", "XL")

	},

    validate(frm) {
        
	},

    size_range_1(frm) {
        // msgprint(frm.doc.size_range_1)
        var sr = frm.doc.size_range_1 +"-"+ frm.doc.size_range_2
        frm.set_value("size_range", sr)
    },

    size_range_2(frm) {
        // msgprint(frm.doc.size_range_2)
        var sr = frm.doc.size_range_1 +"-"+ frm.doc.size_range_2
        frm.set_value("size_range", sr)
    }

    
});



