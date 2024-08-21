// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

frappe.ui.form.on("Material Processing Detail", {
	refresh(frm) {
        // console.log(frm.doc);
        var name = frm.doc.name;
        console.log(name);

        // frappe.db.get_doc('Costing Accessories', 'COST-B695-V0-00001')
        // frappe.db.get_doc('Costing Accessories', frm.doc.reference_parent_parent)
        // .then(doc => {
        //     var val = doc.table_material_processing;
        //     console.log(doc.table_material_processing)

        //     // Get Cost Per Meter
        //     // var row =  frm.doc.table_material_processing;
        //     var row = val; var name = frm.doc.name; var cost_per_meter;
        //     for (var x=0; x<row.length; x++) {
        //         if (row[x]["name"] == name)
        //         cost_per_meter = row[x]["cost_per_meter"];
        //     }   console.log(cost_per_meter);
        // })

        // frappe.db.set_value('Material Processing', frm.doc.reference_parent, 'cost_per_meter', 111)
        // .then(r => {
        //     var val = r.message;
        //     console.log(val);
        // })


        // Tab Lamination
        // (Total Mix Amount Kg, Total Cost of Mixed Amount, Total Solvent Kg)
        // Sum Mix Amount Kg, Sum Cost of Mixed Amount in table, Sum Solvent Kg in table 
        // console.log(frm.doc.table_lamination);
        var list_l1 =  frm.doc.table_lamination;
        var total_mix_amount_kg = 0; var total_cost_of_mixed_amount = 0; var total_solvent_kg = 0;
        for (var x=0; x<list_l1.length; x++) {
            total_mix_amount_kg += parseFloat(list_l1[x]["mix_amount_kg"]);
            total_cost_of_mixed_amount += parseFloat(list_l1[x]["cost_of_mixed_amount"]);
            total_solvent_kg += parseFloat(list_l1[x]["solvent_kg"]);
        }
        // if (!isNaN(total_mix_amount_kg))
        //     frm.set_value("total_mix_amount_kg", total_mix_amount_kg);
        if (!isNaN(total_cost_of_mixed_amount))
            frm.set_value("total_cost_of_mixed_amount", total_cost_of_mixed_amount.toFixed(2));
        if (!isNaN(total_solvent_kg))
            frm.set_value("total_solvent_kg", total_solvent_kg);
        
            
        // cost_of_solid_glue_1_kg = Cost of Mixed Amount / Solvent Kg
        var cost_of_solid_glue_1_kg = total_cost_of_mixed_amount.toFixed(2) / total_solvent_kg;
        if (!isNaN(cost_of_solid_glue_1_kg))
         frm.set_value("cost_of_solid_glue_1_kg", cost_of_solid_glue_1_kg.toFixed(3));
        
        var coat_weight = frm.doc.coat_weight;
        var cost_of_solid_glue_1_m2 = (cost_of_solid_glue_1_kg.toFixed(3)/1000) * coat_weight;
        if (!isNaN(cost_of_solid_glue_1_m2))
            frm.set_value("cost_of_solid_glue_1_m2", cost_of_solid_glue_1_m2.toFixed(4));

        var cost_per_meter = (cost_of_solid_glue_1_m2 * 1.5).toFixed(3);
        if (!isNaN(cost_per_meter))
            frm.set_value("cost_per_meter", cost_per_meter)

        // var pairs_per_meter = frm.doc.pairs_per_meter
        // var cost_per_cup = cost_per_meter / pairs_per_meter;
        // if (!isNaN(cost_per_cup))
        //     frm.set_value("cost_per_cup", cost_per_cup.toFixed(3));
	},

    
    // Tab Lamination 1
    coat_weight(frm) {
        var cost_of_solid_glue_1_kg = parseFloat(frm.doc.cost_of_solid_glue_1_kg).toFixed(3);
        var coat_weight = frm.doc.coat_weight;
        var cost_of_solid_glue_1_m2 = (cost_of_solid_glue_1_kg/1000) * coat_weight;
        if (!isNaN(cost_of_solid_glue_1_m2))
            frm.set_value("cost_of_solid_glue_1_m2", cost_of_solid_glue_1_m2.toFixed(4));

        var cost_per_meter = (cost_of_solid_glue_1_m2 * 1.5).toFixed(3);
        if (!isNaN(cost_per_meter))
            frm.set_value("cost_per_meter", cost_per_meter)

        // var pairs_per_meter = frm.doc.pairs_per_meter
        // var cost_per_cup = cost_per_meter / pairs_per_meter;
        // if (!isNaN(cost_per_cup))
        //     frm.set_value("cost_per_cup", cost_per_cup.toFixed(3));
    },


    after_save(frm) {
        // update cost per meter in parent
        var name = frm.doc.name;
        console.log(name);

        frappe.db.set_value('Material Processing', frm.doc.reference_parent, 'cost_per_meter', frm.doc.cost_per_meter)
        .then(r => {
            var val = r.message;
            console.log(val);
        })
	},

});



// Child Table //
// Tabel Lamination
frappe.ui.form.on('Lamination', { // The child table is defined in a DoctType called "Dynamic Link"
    table_lamination_add(frm, cdt, cdn) { // "links" is the name of the table field in ToDo, "_add" is the event
        // frm: current ToDo form
        // cdt: child DocType 'Dynamic Link'
        // cdn: child docname (something like 'a6dfk76')
        // cdt and cdn are useful for identifying which row triggered this event
    },
    form_render(frm, cdt, cdn) {
        // console.log("form_render")
        // var row = frappe.get_doc(cdt, cdn);
        // console.log(frm.doc.table_lamination);
	},

    mix_amount_kg(frm, cdt, cdn) {
        // cdt is Child DocType name i.e Quotation Item
        // cdn is the row name for e.g bbfcb8da6a
        var row = frappe.get_doc(cdt, cdn);

        // console.log("mix_amount_kg"); console.log(cdt); console.log(cdn); console.log(row);
        var price_per_kg = row.price_per_kg;
        var mix_amount_kg = row.mix_amount_kg;
        var cost_of_mixed_amount = parseFloat(price_per_kg) * parseFloat(mix_amount_kg);
        frappe.model.set_value(cdt, cdn, "cost_of_mixed_amount", cost_of_mixed_amount);
    },

    solid_percent(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        var solid_percent = row.solid_percent
        var solvent_percent = 100 - solid_percent;
        frappe.model.set_value(cdt, cdn, "solvent_percent", solvent_percent);
    },
});