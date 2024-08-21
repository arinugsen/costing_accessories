// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

var name_doc = "";

frappe.ui.form.on("Costing Accessories", {
	refresh(frm) {
        // console.log(frm.doc.name);
        name_doc = frm.doc.name;
        
        // Table Raw Material
        // Calculate Total Raw Material Cost
        set_total_raw_material_cost(frm);

        // Table Material Processing
        // Calculate Lamination Cost
        set_lamination_cost(frm);
        

        frm.add_custom_button('Duplicate', () => {
            // frappe.new_doc(doctype, route_options, init_callback);

            // frappe.new_doc('Costing Accessories Manual', {
            //     library_member: frm.doc.name
            // });

            // msgprint("Duplicate");
            // doc = frappe.new_doc('Task');
            // doc.title = 'New Task 1';
            // doc.insert();
            // console.log(doc);

            // frappe.new_doc("Journal Entry", {"voucher_type": "Bank Entry"}, doc => {
            //     doc.posting_date = frappe.datetime.get_today();
            //     let row = frappe.model.add_child(doc, "accounts");
            //     row.account = 'Bank - A';
            //     row.account_currency = 'USD';
            //     row.debit_in_account_currency = 100.0;
            //     row.credit_in_account_currency = 0.0;
            // });

            duplicate_row(frm);

        });

        
        // frappe.db.set_value('Material Processing', "MP-Lamination 3-Inner Material 2 - Inner Material 3-00014", 'reference_doc_name', "MP-Lamination 3-Inner Material 2 - Inner Material 3-00014")
        // .then(r => {
        //     var val = r.message;
        //     console.log("Update Material Processing");
        //     console.log(val);
        // });
        // var row =  frm.doc.table_material_processing;
        // for (var x=0; x<row.length; x++) {
        //     // if (row[x]["cost_per_cup"] != "" && row[x]["cost_per_cup"] >= 0)
        //     frappe.db.set_value('Material Processing', row[x]["name"], 'reference_doc_name', row[x]["name"])
        //     .then(r => {
        //         var val = r.message;
        //         console.log("Update Material Processing");
        //         console.log(val);
        //     });
        // }


        // frappe.db.get_doc("Material Processing Detail", "MP-Lamination 1-Inner Liner - Inner Material 1-00010")
        // .then(doc => {
        //     console.log("doc_mpd");
        //     console.log(doc)
        // })
	},


    size_range_1(frm) {
        set_size_range(frm)
    },
    size_range_2(frm) {
        set_size_range(frm)
    },
    pairs_per_meter(frm) {
        // in Table Raw Material
        var pairs_per_meter = frm.doc.pairs_per_meter;
        var row =  frm.doc.table_raw_material;
        // console.log("row"); console.log(row);
        for (var x=0; x<row.length; x++) {
            if (row[x]["classification"] == "Fabric" || row[x]["classification"] == "Foam") {
                var cost_per_cup = parseFloat(row[x]["cost_per_cup"]);
                console.log(cost_per_cup);
                var cost_per_meter = parseFloat(row[x]["cost_per_meter"]);
                var cost_per_cup = cost_per_meter / pairs_per_meter;
                console.log(cost_per_cup);
                if (!isNaN(cost_per_cup)) {
                    cost_per_cup = cost_per_cup.toFixed(4);
                    cost_per_cup = cost_per_cup.toString() + "1";
                    frappe.model.set_value(row[x]["doctype"], row[x]["name"], "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
                }
            }
        }
        
        // in Table Material Processing
        var pairs_per_meter = frm.doc.pairs_per_meter;
        var row =  frm.doc.table_material_processing;
        // console.log("row"); console.log(row);
        for (var x=0; x<row.length; x++) {
            if (row[x]["lamination_for"] == "Fabric" || row[x]["lamination_for"] == "Foam") {
                var cost_per_cup = parseFloat(row[x]["cost_per_cup"]);
                console.log(cost_per_cup);
                var cost_per_meter = parseFloat(row[x]["cost_per_meter"]);
                var cost_per_cup = cost_per_meter / pairs_per_meter;
                console.log(cost_per_cup);
                if (!isNaN(cost_per_cup)) {
                    cost_per_cup = cost_per_cup.toFixed(4);
                    cost_per_cup = cost_per_cup.toString() + "1";
                    frappe.model.set_value(row[x]["doctype"], row[x]["name"], "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
                }
            }
        }
    },

    cookie_pairs_per_meter(frm) {
        // in Table Raw Material
        var cookie_pairs_per_meter = frm.doc.cookie_pairs_per_meter;
        var row =  frm.doc.table_raw_material;
        // console.log("row"); console.log(row);
        for (var x=0; x<row.length; x++) {
            if (row[x]["classification"] == "Cookie") {
                var cost_per_cup = parseFloat(row[x]["cost_per_cup"]);
                console.log(cost_per_cup);
                var cost_per_meter = parseFloat(row[x]["cost_per_meter"]);
                var cost_per_cup = cost_per_meter / cookie_pairs_per_meter;
                console.log(cost_per_cup);
                if (!isNaN(cost_per_cup)) {
                    cost_per_cup = cost_per_cup.toFixed(4);
                    cost_per_cup = cost_per_cup.toString() + "1";
                    frappe.model.set_value(row[x]["doctype"], row[x]["name"], "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
                }
            }
        }

        // in Table Material Processing
        var cookie_pairs_per_meter = frm.doc.cookie_pairs_per_meter;
        var row =  frm.doc.table_material_processing;
        // console.log("row"); console.log(row);
        for (var x=0; x<row.length; x++) {
            if (row[x]["lamination_for"] == "Cookie") {
                var cost_per_cup = parseFloat(row[x]["cost_per_cup"]);
                console.log(cost_per_cup);
                var cost_per_meter = parseFloat(row[x]["cost_per_meter"]);
                var cost_per_cup = cost_per_meter / cookie_pairs_per_meter;
                console.log(cost_per_cup);
                if (!isNaN(cost_per_cup)) {
                    cost_per_cup = cost_per_cup.toFixed(4);
                    cost_per_cup = cost_per_cup.toString() + "1";
                    frappe.model.set_value(row[x]["doctype"], row[x]["name"], "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
                }
            }
        }
    },


    total_raw_material_cost(frm) {
        set_manufacture_cost(frm);
    },

    lamination_cost(frm) {
        set_total_lamination_cost(frm);
    },
    lamination_wastage(frm) {
        set_total_lamination_cost(frm);
    },
    total_lamination_cost(frm) {
        set_manufacture_cost(frm);
    },

    type_overhead(frm) {
        set_total_overhead_cost(frm);
    },
    total_overhead_cost(frm) {
        set_manufacture_cost(frm);
    },

    manufactur_cost(frm) {
        set_total_manufacture_cost(frm);
        
        set_total_packaging_cost(frm);
        set_total_transport_cost(frm);
    },

    manufactur_wastage(frm) {
        set_total_manufacture_cost(frm);
    },

    total_manufactur_cost(frm) {
        set_total_cost(frm);
    },

    packaging_cost_percent(frm) {
        set_total_packaging_cost(frm);
    },

    total_packaging_cost(frm) {
        set_total_cost(frm);
    },

    transport_cost_percent(frm) {
        set_total_transport_cost(frm);
    },

    total_transport_cost(frm) {
        set_total_cost(frm);
    },

    total_mold_cost(frm) {
        set_total_cost(frm);
    },

    total_cost(frm) {
        set_cup_price(frm);
    },
    
    profit_percent(frm) {
        set_cup_price(frm);
    },
    
    cup_price(frm) {
        set_final_price(frm);
    },

});


// Function
function set_size_range(frm) {
    sr1 = frm.doc.size_range_1;
    sr2 = frm.doc.size_range_2;
    console.log(sr2);

    if (sr1 != "" && sr1 != undefined && sr2 != "" && sr2 != undefined) {

        sr = sr1 +"-"+ sr2;  console.log(sr);
        frm.set_value("size_range", sr);

        frappe.db.get_value('Size', sr1, 'no')
        .then(r => {
            var value = r.message;
            console.log(value);
            no1 = value.no;

            frappe.db.get_value('Size', sr2, 'no')
                .then(r => {
                    var value = r.message;
                    console.log(value);
                    no2 = value.no;

                    frappe.call({
                        method:
                            "costing_accessories.costing_for_accessories.doctype.costing_accessories.costing_accessories.get_pairs_meter",
                        type: "GET",
                        args: {
                            sr1: sr1,
                            sr2: sr2,
                            no1: no1,
                            no2: no2
                        },
                        callback: function(r) {
                            if (r.message) {
                                var value = r.message;
                                console.log("pairs_per_meter");
                                console.log(value);

                                var qty_foam_cup_per_m_prs = value;
                                var qty_foam_cup_per_m_prs_ = qty_foam_cup_per_m_prs.toFixed(1);
                                // var qty_foam_cup_per_m_prs_arr = qty_foam_cup_per_m_prs_.toString().split(".");
                                console.log(qty_foam_cup_per_m_prs_);
                                
                                var qty_foam_cup_per_m_prs_fix;
                                // if (0<=Number.parseInt(qty_foam_cup_per_m_prs_arr[1]) && Number.parseInt(qty_foam_cup_per_m_prs_arr[1])<=4) {
                                //     qty_foam_cup_per_m_prs_fix = qty_foam_cup_per_m_prs_arr[0];
                                // } else if (5<=Number.parseInt(qty_foam_cup_per_m_prs_arr[1]) && Number.parseInt(qty_foam_cup_per_m_prs_arr[1])<=9) {
                                //     qty_foam_cup_per_m_prs_fix = qty_foam_cup_per_m_prs_arr[0]+".5";
                                // }

                                qty_foam_cup_per_m_prs_fix = Math.floor(qty_foam_cup_per_m_prs_);
                                frm.set_value("pairs_per_meter", qty_foam_cup_per_m_prs_fix);

                            }
                        },
                        error: (r) => {
                            // on error
                        }
                    });


                    // frappe.db.get_list('Size', {
                    //     fields: ['no', 'size'],
                    //     filters: {
                    //         no: '2'
                    //     }
                    // }).then(records => {
                    //     console.log(records);
                    // })


                })

        })
    }
}


function duplicate_row(frm) {
    var doc_ori = frm.doc;
    // frappe.new_doc(doctype, route_options, init_callback);
    // frappe.new_doc("Costing Accessories Manual", {"name": doc_ori.name}, doc => {

    //     doc_man = doc;
        
    //     doc_man.date = doc_ori.date;
    //     doc_man.article = doc_ori.article;
    //     doc_man.style = doc_ori.style;
    //     doc_man.revision = doc_ori.revision;
    //     doc_man.buyer = doc_ori.buyer;
    //     doc_man.size_range_1 = doc_ori.size_range_1;
    //     doc_man.size_range_2 = doc_ori.size_range_2;
    //     doc_man.size_range = doc_ori.size_range;
    //     doc_man.pairs_per_meter = doc_ori.pairs_per_meter;
    //     doc_man.cookie_pairs_per_meter = doc_ori.cookie_pairs_per_meter;

    //     doc_man.total_raw_material_cost = doc_ori.total_raw_material_cost;
    //     doc_man.lamination_cost = doc_ori.lamination_cost;
    //     doc_man.lamination_wastage = doc_ori.lamination_wastage;
    //     doc_man.total_lamination_cost = doc_ori.total_lamination_cost;

    //     doc_man.type_overhead = doc_ori.type_overhead;
    //     doc_man.total_overhead_cost = doc_ori.total_overhead_cost;
    //     doc_man.manufactur_cost = doc_ori.manufactur_cost;
    //     doc_man.manufactur_wastage = doc_ori.manufactur_wastage;
    //     doc_man.total_manufactur_cost = doc_ori.total_manufactur_cost;

    //     doc_man.packaging_cost_percent = doc_ori.packaging_cost_percent;
    //     doc_man.total_packaging_cost = doc_ori.total_packaging_cost;
    //     doc_man.transport_cost_percent = doc_ori.transport_cost_percent;
    //     doc_man.total_transport_cost = doc_ori.total_transport_cost;
    //     doc_man.total_mold_cost = doc_ori.total_mold_cost;

    //     doc_man.total_cost = doc_ori.total_cost;
    //     doc_man.profit_percent = doc_ori.profit_percent;
    //     doc_man.cup_price = doc_ori.cup_price;
    //     doc_man.final_price = doc_ori.final_price;

    //     doc_man.table_raw_material = doc_ori.table_raw_material;
    //     doc_man.table_material_processing = doc_ori.table_material_processing;

    //     doc_man.reference_doc_name = name_doc;
        
    //     // doc_man.save();
    //     console.log(doc);
    // });

    // Insert Costing Accessories Manual
    frappe.db.exists('Costing Accessories Manual', name_doc)
    .then(exists => {
        console.log(exists); // true 
        console.log(name_doc)
        if (!exists) {
            frappe.db.insert({
                doctype: 'Costing Accessories Manual',
                name: name_doc,
        
                date: doc_ori.date,
                article: doc_ori.article,
                style: doc_ori.style,
                revision: doc_ori.revision,
                buyer: doc_ori.buyer,
                size_range_1: doc_ori.size_range_1,
                size_range_2: doc_ori.size_range_2,
                size_range: doc_ori.size_range,
                pairs_per_meter: doc_ori.pairs_per_meter,
                cookie_pairs_per_meter: doc_ori.cookie_pairs_per_meter,

                total_raw_material_cost: doc_ori.total_raw_material_cost,
                lamination_cost: doc_ori.lamination_cost,
                lamination_wastage: doc_ori.lamination_wastage,
                total_lamination_cost: doc_ori.total_lamination_cost,

                type_overhead: doc_ori.type_overhead,
                total_overhead_cost: doc_ori.total_overhead_cost,
                manufactur_cost: doc_ori.manufactur_cost,
                manufactur_wastage: doc_ori.manufactur_wastage,
                total_manufactur_cost: doc_ori.total_manufactur_cost,

                packaging_cost_percent: doc_ori.packaging_cost_percent,
                total_packaging_cost: doc_ori.total_packaging_cost,
                transport_cost_percent: doc_ori.transport_cost_percent,
                total_transport_cost: doc_ori.total_transport_cost,
                total_mold_cost: doc_ori.total_mold_cost,

                total_cost: doc_ori.total_cost,
                profit_percent: doc_ori.profit_percent,
                cup_price: doc_ori.cup_price,
                final_price: doc_ori.final_price,

                table_raw_material: doc_ori.table_raw_material,
                table_material_processing: doc_ori.table_material_processing,

                reference_doc_name: name_doc,
            }).then(doc => {
                // Update name doc
                // frappe.db.set_value(doctype, docname, fieldname, value, callback), it's same as using frappe.get_doc and doc.save 
                // frappe.db.set_value('Costing Accessories Manual', doc.name, 'name', name_doc)
                // .then(r => {
                //     var val = r.message;
                //     console.log(val);
                //     console.log("Duplicate Done");
                //     console.log(doc);
                // });

                // frappe.rename_doc('Costing Accessories Manual', doc.name, name_doc);
                frappe.call('costing_accessories.costing_for_accessories.doctype.costing_accessories.costing_accessories.rename_doc_name', {
                    old_name: doc.name,
                    new_name: name_doc,
                }).then(r => {
                    var val = r.message;
                    console.log(val)

                    // insert Material Processing Detail Manual
                    var row =  doc.table_material_processing;
                    console.log("table_material_processing");
                    console.log(row);
                    var reference_doc_name, reference_doc_name_ref;
                    for (var x=0; x<row.length; x++) {
                        reference_doc_name = row[x]["reference_doc_name"];
                        reference_doc_name_ref = row[x]["name"];
                        console.log("reference_doc_name");
                        console.log(reference_doc_name);
                        task(x, reference_doc_name, reference_doc_name_ref);
                    }
                    // frappe.db.insert({
                    //     doctype: 'Material Processing Detail Manual',
                    //     reference_parent: name,
                    //     reference_parent_parent: name_doc,
                    // }).then(doc => {
                    //     // console.log(doc);
                    //     frappe.set_route('Form', "Material Processing Detail Manual", name);
                    // });

                    console.log("Duplicate Done");
                    console.log(doc);
                });

            });
        } else {
            msgprint("Document is already exist in Costing Accessories Manual.");
        }
    });
}

function task(i, reference_doc_name, reference_doc_name_ref) { 
    setTimeout(function() {
        frappe.db.exists('Material Processing Detail', reference_doc_name)
        .then(exists => {
            console.log(exists);
            if (exists) {
                console.log(1); 
                console.log(reference_doc_name); 
                console.log(reference_doc_name_ref); 
                frappe.db.get_doc("Material Processing Detail", reference_doc_name)
                .then(doc => {
                    console.log("doc_mpd");
                    console.log(doc);

                    frappe.db.insert({
                        doctype: 'Material Processing Detail Manual',
                        table_lamination: doc.table_lamination,
                        total_cost_of_mixed_amount: doc.total_cost_of_mixed_amount,
                        total_solvent_kg: doc.total_solvent_kg,
                        cost_of_solid_glue_1_kg: doc.cost_of_solid_glue_1_kg,
                        coat_weight: doc.coat_weight,
                        cost_of_solid_glue_1_m2: doc.cost_of_solid_glue_1_m2,
                        cost_per_meter: doc.cost_per_meter,
                        reference_parent: reference_doc_name_ref,
                        reference_parent_parent: doc.reference_parent_parent,
                    }).then(doc => {
                        console.log(doc);
                    });
                });
            }
        });
    }, 5000 * i); 
} 


// Function chain
function set_total_lamination_cost(frm) {
    var lamination_cost = frm.doc.lamination_cost;
    var lamination_wastage = frm.doc.lamination_wastage;
    var lamination_wastage = lamination_cost * (lamination_wastage / 100);
    console.log("lamination_wastage");
    console.log(lamination_wastage);

    var total_lamination_cost = parseFloat(lamination_cost) + parseFloat(lamination_wastage);
    console.log("total_lamination_cost");
    console.log(total_lamination_cost);
    if (!isNaN(total_lamination_cost)) {
        total_lamination_cost = total_lamination_cost.toFixed(4);
        total_lamination_cost = total_lamination_cost.toString() + "1";
        frm.set_value("total_lamination_cost", parseFloat(total_lamination_cost).toFixed(3));
    }
}

function set_total_overhead_cost(frm) {
    var basic = 0.16; var push_up = 0.18; var insert_wire = 0.32; var spacer = 0.15; var manual_spray = 0.2; 
    // frappe.db.get_value(doctype, name, fieldname)
    frappe.db.get_value('Overhead Type', "Basic", "value").then(r => {var val = r.message; basic = val.value;});
    frappe.db.get_value('Overhead Type', "Push Up", "value").then(r => {var val = r.message; push_up = val.value;});
    frappe.db.get_value('Overhead Type', "Insert Wire", "value").then(r => {var val = r.message; insert_wire = val.value;});
    frappe.db.get_value('Overhead Type', "Spacer", "value").then(r => {var val = r.message; spacer = val.value;});
    frappe.db.get_value('Overhead Type', "Manual Spray", "value")
    .then(r => {
        var val = r.message; manual_spray = val.value;

        var type_overhead = frm.doc.type_overhead;
        if (type_overhead == "Basic") { frm.set_value("total_overhead_cost", basic); }
        if (type_overhead == "Push Up") { frm.set_value("total_overhead_cost", push_up); }
        if (type_overhead == "Insert Wire") { frm.set_value("total_overhead_cost", insert_wire); }
        if (type_overhead == "Spacer") { frm.set_value("total_overhead_cost", spacer); }
        if (type_overhead == "Manual Spray") { frm.set_value("total_overhead_cost", manual_spray); }
    });
}

function set_manufacture_cost(frm) {
    var total_raw_material_cost = frm.doc.total_raw_material_cost;
    var total_lamination_cost = frm.doc.total_lamination_cost;
    var total_overhead_cost = frm.doc.total_overhead_cost;
    
    var manufactur_cost = parseFloat(total_raw_material_cost) + parseFloat(total_lamination_cost) + parseFloat(total_overhead_cost);
    console.log("manufactur_cost");
    console.log(manufactur_cost);
    if (!isNaN(manufactur_cost)) {
        manufactur_cost = manufactur_cost.toFixed(4);
        manufactur_cost = manufactur_cost.toString() + "1";
        frm.set_value("manufactur_cost", parseFloat(manufactur_cost).toFixed(3));
    }
}

function set_total_manufacture_cost(frm) {
    var manufactur_cost = frm.doc.manufactur_cost;
    var manufactur_wastage = frm.doc.manufactur_wastage;
    var manufactur_wastage = manufactur_cost * (manufactur_wastage / 100);
    console.log("manufactur_wastage");
    console.log(manufactur_wastage);

    var total_manufactur_cost = parseFloat(manufactur_cost) + parseFloat(manufactur_wastage);
    console.log("total_manufactur_cost");
    console.log(total_manufactur_cost);
    if (!isNaN(total_manufactur_cost)) {
        total_manufactur_cost = total_manufactur_cost.toFixed(4);
        total_manufactur_cost = total_manufactur_cost.toString() + "1";
        frm.set_value("total_manufactur_cost", parseFloat(total_manufactur_cost).toFixed(3));
    }
}

function set_total_packaging_cost(frm) {
    var manufactur_cost = frm.doc.manufactur_cost;
    var packaging_cost_percent = frm.doc.packaging_cost_percent;
    var packaging_cost_percent = manufactur_cost * (packaging_cost_percent / 100);
    console.log("packaging_cost_percent");
    console.log(packaging_cost_percent);

    var total_packaging_cost = packaging_cost_percent;
    console.log("total_packaging_cost");
    console.log(total_packaging_cost);
    if (!isNaN(total_packaging_cost)) {
        total_packaging_cost = total_packaging_cost.toFixed(4);
        total_packaging_cost = total_packaging_cost.toString() + "1";
        frm.set_value("total_packaging_cost", parseFloat(total_packaging_cost).toFixed(3));
    }
}

function set_total_transport_cost(frm) {
    var manufactur_cost = frm.doc.manufactur_cost;
        var transport_cost_percent = frm.doc.transport_cost_percent;
        var transport_cost_percent = manufactur_cost * (transport_cost_percent / 100);
        console.log("transport_cost_percent");
        console.log(transport_cost_percent);

        var total_transport_cost = transport_cost_percent;
        console.log("total_transport_cost");
        console.log(total_transport_cost);
        if (!isNaN(total_transport_cost)) {
            total_transport_cost = total_transport_cost.toFixed(4);
            total_transport_cost = total_transport_cost.toString() + "1";
            frm.set_value("total_transport_cost", parseFloat(total_transport_cost).toFixed(3));
        }
}

function set_total_cost(frm) {
    var total_manufactur_cost = frm.doc.total_manufactur_cost;
    var total_packaging_cost = frm.doc.total_packaging_cost;
    var total_transport_cost = frm.doc.total_transport_cost;
    var total_mold_cost = frm.doc.total_mold_cost;

    var total_cost = parseFloat(total_manufactur_cost) + parseFloat(total_packaging_cost) + parseFloat(total_transport_cost) + parseFloat(total_mold_cost);
    console.log("total_cost");
    console.log(total_cost);
    if (!isNaN(total_cost)) {
        total_cost = total_cost.toFixed(4);
        total_cost = total_cost.toString() + "1";
        frm.set_value("total_cost", parseFloat(total_cost).toFixed(3));
    }
}

function set_cup_price(frm) {
    var total_cost = frm.doc.total_cost;
    var profit_percent = frm.doc.profit_percent;
    var profit_percent = total_cost * (profit_percent / 100);
    console.log("profit_percent");
    console.log(profit_percent);
    
    var cup_price = parseFloat(total_cost) + parseFloat(profit_percent);
    console.log("cup_price");
    console.log(cup_price);
    if (!isNaN(cup_price)) {
        cup_price = cup_price.toFixed(4);
        cup_price = cup_price.toString() + "1";
        frm.set_value("cup_price", parseFloat(cup_price).toFixed(3));
    }
}

function set_final_price(frm) {
    var cup_price = frm.doc.cup_price;
    var final_price = parseFloat(cup_price) / 0.9;
    console.log("final_price");
    console.log(final_price);
    if (!isNaN(final_price)) {
        final_price = final_price.toFixed(4);
        final_price = final_price.toString() + "1";
        frm.set_value("final_price", parseFloat(final_price).toFixed(3));
    }
}



// Child Table //

// Table Raw Material
frappe.ui.form.on('Raw Material', { 
    // Triggered when a row is added to a Table field
    table_raw_material_add(frm, cdt, cdn) { 
       set_total_raw_material_cost(frm);
    },
    // Triggered when a row is removed from a Table field
    table_raw_material_remove(frm, cdt, cdn) {
        set_total_raw_material_cost(frm);
    },
    // Triggered when a row is opened as a form in a Table field
    form_render(frm, cdt, cdn) {
        // var row = frappe.get_doc(cdt, cdn);
        set_total_raw_material_cost(frm);
	},

    type(frm, cdt, cdn) {
        // var row = frappe.get_doc(cdt, cdn);
        // var type = row.type;
    },

    classification(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        var type = row.type;
        var classification = row.classification;
        
        if (classification == "Fabric") {
            var child = locals[cdt][cdn];
            // frm.set_df_property('table_raw_material', 'hidden', 0, frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'fieldtype', "Link", frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'options', "Fabric Price", frm.docname, 'article', child.name);
        } else if (classification == "Foam") {
            // frm.set_df_property(fieldname, property, value, docname, table_field, table_row_name);
            // fieldname - Parent Doctype Field Name
            // property - read_only, reqd, hidden …etc
            // value - 1 or 0 or characters
            // docname - Name of the current doctype | frm.docname
            // table_field - Field Inside the child table
            // table_row_name - name of the row | child.name

            var child = locals[cdt][cdn];
            // frm.set_df_property('table_raw_material', 'hidden', 1, frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'fieldtype', "Link", frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'options', "Foam Price", frm.docname, 'article', child.name);
            // cur_frm.refresh_field("table_raw_material");

            console.log(frm); console.log(frm.docname); console.log(child.name); console.log(cdt); console.log(cdn);

        // } else if (classification=="Cookie" && classification=="Tricot" || classification=="Metal Wire" || classification=="Tpu Wire") {
        } else {
            var child = locals[cdt][cdn];
            // frm.set_df_property('table_raw_material', 'hidden', 1, frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'fieldtype', "Data", frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'options', "", frm.docname, 'article', child.name);
        } 
    },

    article(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        var child = locals[cdt][cdn];
        var type = row.type;
        var classification = row.classification;
        var article = row.article;
        
        if (classification == "Fabric") {
            // frappe.db.get_value(doctype, name, fieldname)
            frappe.db.get_value('Fabric Price', article, "price_per_meter")
            .then(r => {
                console.log("Fabric Price");
                var val = r.message;
                var price_per_meter = val.price_per_meter;
                console.log(val.price_per_meter);
                frappe.model.set_value(cdt, cdn, "cost_per_meter", price_per_meter);
                
                var cost_per_meter = price_per_meter;
                var pairs_per_meter = frm.doc.pairs_per_meter;
                var cost_per_cup = cost_per_meter / pairs_per_meter;
                console.log(cost_per_cup);
                if (!isNaN(cost_per_cup)) {
                    cost_per_cup = cost_per_cup.toFixed(4);
                    cost_per_cup = cost_per_cup.toString() + "1";
                    frappe.model.set_value(cdt, cdn, "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
                }
                // set_total_raw_material_cost(frm);
            });
        } else if (classification == "Foam") {
            // frappe.db.get_value(doctype, name, fieldname)
            frappe.db.get_value('Foam Price', article, ["type_of_price", 'thickness', "price_per_mm", "price_custom"])
            .then(r => {
                console.log("Foam Price");
                var val = r.message;
                var type_of_price = val.type_of_price;
                var thickness = val.thickness;
                var price_per_mm = val.price_per_mm;
                var price_custom = val.price_custom;
                console.log(val.type_of_price);
                
                var cost_per_meter = 0;
                if (type_of_price == "Per Mili Meter") {
                    cost_per_meter = thickness * price_per_mm;
                    frappe.model.set_value(cdt, cdn, "cost_per_meter", cost_per_meter);
                } else if (type_of_price == "Custom") {
                    cost_per_meter = price_custom;
                    frappe.model.set_value(cdt, cdn, "cost_per_meter", cost_per_meter);
                }
    
                var pairs_per_meter = frm.doc.pairs_per_meter;
                var cost_per_cup = cost_per_meter / pairs_per_meter;
                console.log(cost_per_cup);
                if (!isNaN(cost_per_cup)) {
                    cost_per_cup = cost_per_cup.toFixed(4);
                    cost_per_cup = cost_per_cup.toString() + "1";
                    frappe.model.set_value(cdt, cdn, "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
                }
                // set_total_raw_material_cost(frm);
            });
        } else {
            // set_total_raw_material_cost(frm);
        }
    },

    cost_per_meter(frm, cdt, cdn) {
        // console.log("cdt"); console.log(cdt);
        // console.log("cdn"); console.log(cdn);
        var row = frappe.get_doc(cdt, cdn);
        var child = locals[cdt][cdn];
        var type = row.type;
        var classification = row.classification;
        var article = row.article;
        var cost_per_meter = row.cost_per_meter;

        if (classification == "Cookie") {   // dibagi Cookie Pairs/Meter
            var child = locals[cdt][cdn];
            // frm.set_df_property('table_raw_material', 'hidden', 0, frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'fieldtype', "Data", frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'options', "", frm.docname, 'article', child.name);

            var cookie_pairs_per_meter =  frm.doc.cookie_pairs_per_meter;
            var cost_per_cup = cost_per_meter / cookie_pairs_per_meter;
            console.log("cost_per_cup");
            console.log(cookie_pairs_per_meter);
            console.log(cost_per_meter);
            console.log(cost_per_cup);

            if (!isNaN(cost_per_cup)) {
                cost_per_cup = cost_per_cup.toFixed(4);
                cost_per_cup = cost_per_cup.toString() + "1";
                frappe.model.set_value(cdt, cdn, "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
            }

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
        } else if (classification=="Tricot" || classification=="Metal Wire" || classification=="Tpu Wire") {
            var child = locals[cdt][cdn];
            // frm.set_df_property('table_raw_material', 'hidden', 0, frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'fieldtype', "Data", frm.docname, 'article', child.name);
            frm.set_df_property('table_raw_material', 'options', "", frm.docname, 'article', child.name);
            
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
        } else if (classification=="Fabric" || classification=="Foam") {   // dibagi Pairs/Meter
            var pairs_per_meter = frm.doc.pairs_per_meter;
            var cost_per_cup = cost_per_meter / pairs_per_meter;
            console.log(cost_per_cup);
            if (!isNaN(cost_per_cup)) {
                cost_per_cup = cost_per_cup.toFixed(4);
                cost_per_cup = cost_per_cup.toString() + "1";
                frappe.model.set_value(cdt, cdn, "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
            }
        }

        // Calculate Total Raw Material Cost
        // set_total_raw_material_cost(frm);

    },

    cost_per_cup(frm, cdt, cdn) {
        // Calculate Total Raw Material Cost
        set_total_raw_material_cost(frm);
    },
});

function set_total_raw_material_cost(frm) {
    // frm: current ToDo form
    // cdt: child DocType 'Dynamic Link'
    // cdn: child docname (something like 'a6dfk76')
    // cdt and cdn are useful for identifying which row triggered this event
    
    // Calculate Total Raw Material Cost
    var row =  frm.doc.table_raw_material;
    var total_raw_material_cost = 0;
    for (var x=0; x<row.length; x++) {
        if (row[x]["cost_per_cup"] != "" && row[x]["cost_per_cup"] >= 0)
        total_raw_material_cost += parseFloat(row[x]["cost_per_cup"]);
    }
    console.log("total_raw_material_cost");
    console.log(total_raw_material_cost);
    if (!isNaN(total_raw_material_cost)) {
        total_raw_material_cost = total_raw_material_cost.toFixed(4);
        total_raw_material_cost = total_raw_material_cost.toString() + "1";
        frm.set_value("total_raw_material_cost", parseFloat(total_raw_material_cost).toFixed(3));
    }
}
// end Table Raw Material


// Table Material Processing
frappe.ui.form.on('Material Processing', { 
    // Triggered when a row is added to a Table field
    table_material_processing_add(frm, cdt, cdn) { 
        // var row = frappe.get_doc(cdt, cdn);
        // frm.set_df_property('table_material_processing', 'hidden', 1, frm.docname, 'detail', row.name);
        // var child = locals[cdt][cdn];
        // frm.set_df_property("table_material_processing", "hidden", 1, frm.docname, "detail", child.name);
        set_lamination_cost(frm); 
    },
    // Triggered when a row is removed from a Table field
    table_material_processing_remove(frm, cdt, cdn) {
        set_lamination_cost(frm);
    },
    // Triggered when a row is opened as a form in a Table field
    form_render(frm, cdt, cdn) {
        // frm.get_field("detail").$input.addClass("btn-primary");
        // frappe.get_doc(cdt, cdn).detail.addClass("btn-primary");
        document.querySelectorAll("[data-fieldname='detail']")[1].style.backgroundColor = "#171717";
        document.querySelectorAll("[data-fieldname='detail']")[1].style.color = "#fff";
        // document.querySelectorAll("[data-fieldname='detail']")[1].style.hover ="transparent";
        // document.querySelectorAll("[data-fieldname='detail']")[1].class = "btn btn-xs btn-default btn-primary";
        console.log(document.querySelectorAll("[data-fieldname='detail']")[1]);

        var row = frappe.get_doc(cdt, cdn);
        var name = row.name;
        console.log(name); //console.log(name.substring(0,3));
        if (name.substring(0,3) == "new") {
            frm.set_df_property("table_material_processing", "hidden", 1, frm.docname, "detail", row.name);
        } else {
            frm.set_df_property("table_material_processing", "hidden", 0, frm.docname, "detail", row.name);
        }   //console.log(name_doc);

        set_lamination_cost(frm);
	},

    type(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        var type = row.type;

        if (type == "Lamination 1") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Liner - Inner Material 1");
        } else if (type == "Lamination 2") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 1 - Inner Material 2");
        } else if (type == "Lamination 3") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 2 - Inner Material 3");
        } else if (type == "Lamination 4") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 3 - Inner Material 4");
        } else if (type == "Lamination 5") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 4 - Inner Material 5");
        } else if (type == "Lamination 6") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 5 - Inner Material 6");
        } else if (type == "Lamination 7") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 6 - Inner Material 7");
        } else if (type == "Lamination 8") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 7 - Inner Material 8");
        } else if (type == "Lamination 9") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 8 - Inner Material 9");
        } else if (type == "Lamination 10") {
            frappe.model.set_value(cdt, cdn, "type_rm", "Inner Material 9 - Outer Liner");
        }
    },

    lamination_for(frm, cdt, cdn) {
        set_cost_per_cup(frm, cdt, cdn);
    },

    cost_per_meter(frm, cdt, cdn) {
        set_cost_per_cup(frm, cdt, cdn);
    },

    cost_per_cup(frm, cdt, cdn) {
        // Calculate Lamination Cost
        set_lamination_cost(frm);
    },

    detail(frm, cdt, cdn) {
        // console.log(frm); // console.log(cdt); // console.log(cdn);
        var row = frappe.get_doc(cdt, cdn);
        var child = locals[cdt][cdn];
        console.log(row);
        console.log(child);
        var name = row.name;
        // Insert Material Processing Detail if not exist
        frappe.db.exists('Material Processing Detail', name)
        .then(exists => {
            console.log(exists); // true
            if (!exists) {
                frappe.db.insert({
                    doctype: 'Material Processing Detail',
                    reference_parent: name,
                    reference_parent_parent: name_doc,
                }).then(doc => {
                    // console.log(doc);
                    frappe.set_route('Form', "Material Processing Detail", name);
                });
            } else {
                frappe.set_route('Form', "Material Processing Detail", name);
            }
        });
    },
});

function set_cost_per_cup(frm, cdt, cdn) {
    var row = frappe.get_doc(cdt, cdn);
    var child = locals[cdt][cdn];
    var type = row.type;
    var type_rm = row.type_rm;
    var lamination_for = row.lamination_for;
    var cost_per_meter = row.cost_per_meter;

    // Calculate Cost Per Cup if Cookie
    // jika ikut pembagi cookie, dibagi Cookie Pairs/Meter
    console.log("lamination_for");
    console.log(lamination_for);
    if (lamination_for=="Fabric" || lamination_for=="Foam") {
        var child = locals[cdt][cdn];
        // frm.set_df_property('table_material_processing', 'hidden', 0, frm.docname, 'article', child.name);
        var pairs_per_meter =  frm.doc.pairs_per_meter;
        var cost_per_cup = cost_per_meter / pairs_per_meter;
        console.log("cost_per_cup");
        console.log(pairs_per_meter);
        console.log(cost_per_meter);
        console.log(cost_per_cup);

        if (!isNaN(cost_per_cup)) {
            cost_per_cup = cost_per_cup.toFixed(4);
            cost_per_cup = cost_per_cup.toString() + "1";
            frappe.model.set_value(cdt, cdn, "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
        }
    } else if (lamination_for == "Cookie") {
        var child = locals[cdt][cdn];
        // frm.set_df_property('table_material_processing', 'hidden', 0, frm.docname, 'article', child.name);
        var cookie_pairs_per_meter =  frm.doc.cookie_pairs_per_meter;
        var cost_per_cup = cost_per_meter / cookie_pairs_per_meter;
        console.log("cost_per_cup");
        console.log(cookie_pairs_per_meter);
        console.log(cost_per_meter);
        console.log(cost_per_cup);

        if (!isNaN(cost_per_cup)) {
            cost_per_cup = cost_per_cup.toFixed(4);
            cost_per_cup = cost_per_cup.toString() + "1";
            frappe.model.set_value(cdt, cdn, "cost_per_cup", parseFloat(cost_per_cup).toFixed(3));
        }
    } else {}

}

function set_lamination_cost(frm) {
    // Calculate Lamination Cost
    var row =  frm.doc.table_material_processing;
    var lamination_cost = 0;
    for (var x=0; x<row.length; x++) {
        if (row[x]["cost_per_cup"] != "" && row[x]["cost_per_cup"] >= 0)
        lamination_cost += parseFloat(row[x]["cost_per_cup"]);
    }
    console.log("lamination_cost");
    console.log(lamination_cost);
    if (!isNaN(lamination_cost)) {
        lamination_cost = lamination_cost.toFixed(4);
        lamination_cost = lamination_cost.toString() + "1";
        frm.set_value("lamination_cost", parseFloat(lamination_cost).toFixed(3));
    }
}
// END - Child Table //
