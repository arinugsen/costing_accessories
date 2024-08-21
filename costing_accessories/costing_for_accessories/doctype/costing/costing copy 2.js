// Copyright (c) 2024, PT BRA IT Dept and contributors
// For license information, please see license.txt

// frappe.call(method, args)
// frappe.db.get_doc(doctype, name, filters)
// frappe.db.get_list(doctype, { fields, filters })
// frappe.db.get_value(doctype, name, fieldname)
// frappe.db.get_single_value(doctype, field)
// frappe.db.set_value(doctype, docname, fieldname, value, callback)
// frappe.db.insert(doc)
// frappe.db.count(doctype, filters)
// frappe.db.delete_doc(doctype, name)
// frappe.db.exists(doctype, name)


frappe.ui.form.on("Costing", {

	refresh(frm) {
        // frm.set_value("date", frappe.datetime.nowdate())
        // frm.set_value("classification", "Fabric")

        
        // Tab Lamination 1 
        // (Total Mix Amount Kg, Total Cost of Mixed Amount, Total Solvent Kg)
        // Sum Mix Amount Kg, Sum Cost of Mixed Amount in table, Sum Solvent Kg in table 
        // console.log(frm.doc.table_lamination1);
        var list_l1 =  frm.doc.table_lamination1;
        var total_mix_amount_kg = 0; var total_cost_of_mixed_amount = 0; var total_solvent_kg = 0;
        for (var x=0; x<list_l1.length; x++) {
            total_mix_amount_kg += parseFloat(list_l1[x]["mix_amount_kg"]);
            total_cost_of_mixed_amount += parseFloat(list_l1[x]["cost_of_mixed_amount"]);
            total_solvent_kg += parseFloat(list_l1[x]["solvent_kg"]);
        }
        if (!isNaN(total_mix_amount_kg))
            frm.set_value("total_mix_amount_kg", total_mix_amount_kg);
        if (!isNaN(total_cost_of_mixed_amount))
            frm.set_value("total_cost_of_mixed_amount", total_cost_of_mixed_amount.toFixed(2));
        if (!isNaN(total_solvent_kg))
            frm.set_value("total_solvent_kg", total_solvent_kg);

            
        // cost_solid_glue_1_kg_l1 = Cost of Mixed Amount / Solvent Kg
        var cost_solid_glue_1_kg_l1 = total_cost_of_mixed_amount.toFixed(2)/total_solvent_kg;
        frm.set_value("cost_solid_glue_1_kg_l1", cost_solid_glue_1_kg_l1.toFixed(3));
        
        var coat_weight_l1 = frm.doc.coat_weight_l1;
        var cost_solid_glue_1_m2_l1 = (cost_solid_glue_1_kg_l1.toFixed(3)/1000) * coat_weight_l1;
        if (!isNaN(cost_solid_glue_1_m2_l1))
            frm.set_value("cost_solid_glue_1_m2_l1", cost_solid_glue_1_m2_l1.toFixed(4));

        var cost_of_glue_for_material_1_mtr_length_l1 = (cost_solid_glue_1_m2_l1 * 1.5).toFixed(3);
        if (!isNaN(cost_of_glue_for_material_1_mtr_length_l1))
            frm.set_value("cost_of_glue_for_material_1_mtr_length_l1", cost_of_glue_for_material_1_mtr_length_l1)

        var pairs_per_meter = frm.doc.pairs_per_meter
        var cost_per_cup_l1 = cost_of_glue_for_material_1_mtr_length_l1 / pairs_per_meter;
        if (!isNaN(cost_per_cup_l1))
            frm.set_value("cost_per_cup_l1", cost_per_cup_l1.toFixed(3));

        
        
        // Tab Lamination 5 
        var list_l5 =  frm.doc.table_lamination5;
        console.log("list_l5");
        console.log(list_l5);
        var total_mix_amount_kg_l5 = 0; var total_cost_of_mixed_amount_l5 = 0; var total_solvent_kg_l5 = 0;
        for (var x=0; x<list_l5.length; x++) {
            total_mix_amount_kg_l5 += parseFloat(list_l5[x]["mix_amount_kg"]);
            total_cost_of_mixed_amount_l5 += parseFloat(list_l5[x]["cost_of_mixed_amount"]);
            total_solvent_kg_l5 += parseFloat(list_l5[x]["solvent_kg"]);
        }
        console.log(total_mix_amount_kg_l5);
        console.log(total_cost_of_mixed_amount_l5);
        console.log(total_solvent_kg_l5);

        if (!isNaN(total_mix_amount_kg_l5))
            frm.set_value("total_mix_amount_kg_l5", total_mix_amount_kg_l5);
        if (!isNaN(total_cost_of_mixed_amount_l5))
            frm.set_value("total_cost_of_mixed_amount_l5", total_cost_of_mixed_amount_l5.toFixed(2));
        if (!isNaN(total_solvent_kg_l5))
            frm.set_value("total_solvent_kg_l5", total_solvent_kg_l5);
       
        // cost_solid_glue_1_kg_l5 = Cost of Mixed Amount / Solvent Kg
        var cost_solid_glue_1_kg_l5 = total_cost_of_mixed_amount_l5.toFixed(2)/total_solvent_kg_l5;
        frm.set_value("cost_solid_glue_1_kg_l5", cost_solid_glue_1_kg_l5.toFixed(3));
        
        var coat_weight_l5 = frm.doc.coat_weight_l5;
        var cost_solid_glue_1_m2_l5 = (cost_solid_glue_1_kg_l5.toFixed(3)/1000) * coat_weight_l5;
        if (!isNaN(cost_solid_glue_1_m2_l5))
            frm.set_value("cost_solid_glue_1_m2_l5", cost_solid_glue_1_m2_l5.toFixed(4));

        var cost_of_glue_for_material_1_mtr_length_l5 = (cost_solid_glue_1_m2_l5 * 1.5).toFixed(3);
        if (!isNaN(cost_of_glue_for_material_1_mtr_length_l5))
            frm.set_value("cost_of_glue_for_material_1_mtr_length_l5", cost_of_glue_for_material_1_mtr_length_l5)

        var pairs_per_meter = frm.doc.pairs_per_meter
        var cost_per_cup_l5 = cost_of_glue_for_material_1_mtr_length_l5 / pairs_per_meter;
        if (!isNaN(cost_per_cup_l5))
            frm.set_value("cost_per_cup_l5", cost_per_cup_l5.toFixed(3));

        
        // Tab Raw Material Cost + Lamination Cost
        // total_raw_material_cost_per_cup = cost_per_cup_inner_liner + cost_per_cup_im1 + cost_per_cup_im2 + cost_per_cup_im3 + cost_per_cup_im4 + cost_per_cup_ol
        if (frm.doc.cost_per_cup_inner_liner == undefined) var cost_per_cup_inner_liner = 0;
        else var cost_per_cup_inner_liner = parseFloat(frm.doc.cost_per_cup_inner_liner);
        if (frm.doc.cost_per_cup_im1 == undefined) var cost_per_cup_im1 = 0;
        else var cost_per_cup_im1 = parseFloat(frm.doc.cost_per_cup_im1);

        if (frm.doc.cost_per_cup_im2 == undefined) var cost_per_cup_im2 = 0;
        else var cost_per_cup_im2 = parseFloat(frm.doc.cost_per_cup_im2);
        if (frm.doc.cost_per_cup_im3 == undefined) var cost_per_cup_im3 = 0;
        else var cost_per_cup_im3 = parseFloat(frm.doc.cost_per_cup_im3);
        if (frm.doc.cost_per_cup_im4 == undefined) var cost_per_cup_im4 = 0;
        else var cost_per_cup_im4 = parseFloat(frm.doc.cost_per_cup_im4);

        if (frm.doc.cost_per_cup_ol == undefined) var cost_per_cup_ol = 0;
        else var cost_per_cup_ol = parseFloat(frm.doc.cost_per_cup_ol);

        var total_raw_material_cost_per_cup = cost_per_cup_inner_liner + cost_per_cup_im1 + cost_per_cup_im2 + cost_per_cup_im3 + cost_per_cup_im4 + cost_per_cup_ol;
        console.log("total_raw_material_cost_per_cup");
        console.log(total_raw_material_cost_per_cup);
        if (!isNaN(total_raw_material_cost_per_cup))
            frm.set_value("total_raw_material_cost_per_cup", total_raw_material_cost_per_cup.toFixed(3));
        
        // Tab Raw Material Cost + Lamination Cost
        // total_lamination = cost_per_cup_l1 + cost_per_cup_l2 + cost_per_cup_l3 + cost_per_cup_l4 + cost_per_cup_l5
        if (frm.doc.cost_per_cup_l1 == undefined) var cost_per_cup_l1 = 0;
        else var cost_per_cup_l1 = parseFloat(frm.doc.cost_per_cup_l1);
        if (frm.doc.cost_per_cup_l2 == undefined) var cost_per_cup_l2 = 0;
        else var cost_per_cup_l2 = parseFloat(frm.doc.cost_per_cup_l2);
        if (frm.doc.cost_per_cup_l3 == undefined) var cost_per_cup_l3 = 0;
        else var cost_per_cup_l3 = parseFloat(frm.doc.cost_per_cup_l3);
        if (frm.doc.cost_per_cup_l4 == undefined) var cost_per_cup_l4 = 0;
        else var cost_per_cup_l4 = parseFloat(frm.doc.cost_per_cup_l4);
        if (frm.doc.cost_per_cup_l5 == undefined) var cost_per_cup_l5 = 0;
        else var cost_per_cup_l5 = parseFloat(frm.doc.cost_per_cup_l5);

        var total_lamination = cost_per_cup_l1 + cost_per_cup_l2 + cost_per_cup_l3 + cost_per_cup_l4 + cost_per_cup_l5;
        console.log("total_lamination");
        console.log(total_lamination);
        if (!isNaN(total_lamination))
            frm.set_value("total_lamination", total_lamination.toFixed(3));


        // Tab Overhead
        // frm.set_df_property('table_overhead', 'hidden', 1);

        var list_oh =  frm.doc.table_overhead;
        var total_process_time_hours = 0;
        for (var x=0; x<list_oh.length; x++) {
            if (list_oh[x]["man_hours"] == undefined) total_process_time_hours += 0;
            else total_process_time_hours += parseFloat(list_oh[x]["man_hours"]);
        }
        if (!isNaN(total_process_time_hours))
            frm.set_value("total_process_time_hours", total_process_time_hours);

        var total_process_time_minute = total_process_time_hours * 60;
        frm.set_value("total_process_time_minute", total_process_time_minute);
        

        // Tab Cup Price
        var total_raw_material_cost_per_cup = frm.doc.total_raw_material_cost_per_cup;
        if (total_raw_material_cost_per_cup == undefined) total_raw_material_cost_per_cup = 0;
        var total_lamination_cost = frm.doc.total_lamination_cost;
        if (total_lamination_cost == undefined) total_lamination_cost = 0;
        var overhead_cost_per_cup_pair = frm.doc.overhead_cost_per_cup_pair;
        if (overhead_cost_per_cup_pair == undefined) overhead_cost_per_cup_pair = 0;
        var manufacturing_cost = parseFloat(total_raw_material_cost_per_cup) + parseFloat(total_lamination_cost) + parseFloat(overhead_cost_per_cup_pair);
        frm.set_value("manufacturing_cost", manufacturing_cost);

	},
    // end refresh



    // Tab Details
    size_range_1(frm) {
        set_size_range(frm)
    },
    size_range_2(frm) {
        set_size_range(frm)
    },


    // Tab Inner Liner
    article_inner_liner(frm) {
        var pairs_per_meter = frm.doc.pairs_per_meter;
        var cost_per_meter_inner_liner = frm.doc.cost_per_meter_inner_liner;
        var cost_per_cup_inner_liner = cost_per_meter_inner_liner/pairs_per_meter;
        var cost_per_cup_inner_liner_ = cost_per_cup_inner_liner.toFixed(3);
        frm.set_value("cost_per_cup_inner_liner", cost_per_cup_inner_liner_);
    },


    // Tab Lamination 1
    coat_weight_l1(frm) {
        var cost_solid_glue_1_kg_l1 = parseFloat(frm.doc.cost_solid_glue_1_kg_l1).toFixed(3);
        var coat_weight_l1 = frm.doc.coat_weight_l1;
        var cost_solid_glue_1_m2_l1 = (cost_solid_glue_1_kg_l1/1000) * coat_weight_l1;
        if (!isNaN(cost_solid_glue_1_m2_l1))
            frm.set_value("cost_solid_glue_1_m2_l1", cost_solid_glue_1_m2_l1.toFixed(4));

        var cost_of_glue_for_material_1_mtr_length_l1 = (cost_solid_glue_1_m2_l1 * 1.5).toFixed(3);
        if (!isNaN(cost_of_glue_for_material_1_mtr_length_l1))
            frm.set_value("cost_of_glue_for_material_1_mtr_length_l1", cost_of_glue_for_material_1_mtr_length_l1)

        var pairs_per_meter = frm.doc.pairs_per_meter
        var cost_per_cup_l1 = cost_of_glue_for_material_1_mtr_length_l1 / pairs_per_meter;
        if (!isNaN(cost_per_cup_l1))
            frm.set_value("cost_per_cup_l1", cost_per_cup_l1.toFixed(3));
    },


    //  Tab Inner Material 1
    article_im1(frm) {
        // console.log("Tab Inner Material 1");
        // var thickness = frm.doc.thickness;
        // var price = frm.doc.price;
        // var cost_per_meter_im1 = thickness*price;
        // frm.set_value("cost_per_meter_im1", cost_per_meter_im1);

        var article_im1 = frm.doc.article_im1;
        // frappe.db.get_value(doctype, name, fieldname)
        frappe.db.get_value('Foam Price', article_im1, ["type_of_price", 'thickness', "price_per_mm", "price_custom"])
        .then(r => {
            console.log("Inner Material 1");
            var val = r.message;
            var type_of_price = val.type_of_price;
            var thickness = val.thickness;
            var price_per_mm = val.price_per_mm;
            var price_custom = val.price_custom;
            console.log(val.type_of_price);

            if (type_of_price == "Per Mili Meter") {
                var cost_per_meter_im1 = thickness * price_per_mm;
                frm.set_value("cost_per_meter_im1", cost_per_meter_im1);
            } else if (type_of_price == "Custom") {
                var cost_per_meter_im1 = price_custom;
                frm.set_value("cost_per_meter_im1", cost_per_meter_im1);
            } else {

            }

            var pairs_per_meter = frm.doc.pairs_per_meter;
            var cost_per_meter_im1 = frm.doc.cost_per_meter_im1;
            var cost_per_cup_im1 = cost_per_meter_im1 / pairs_per_meter;
            var cost_per_cup_im1_ = cost_per_cup_im1.toFixed(3);
            frm.set_value("cost_per_cup_im1", cost_per_cup_im1_);

        })

        // var pairs_per_meter = frm.doc.pairs_per_meter;
        // var cost_per_meter_im1 = frm.doc.cost_per_meter_im1;
        // var cost_per_cup_im1 = cost_per_meter_im1/pairs_per_meter;
        // var cost_per_cup_im1_ = cost_per_cup_im1.toFixed(3);
        // frm.set_value("cost_per_cup_im1", cost_per_cup_im1_);
    },


    // Tab Lamination 2
    // Tab Inner Material 2 - Cookies 1
    // Tab Lamination 3
    // Tab Inner Material 3 - Cookies 2
    // Tab Lamination 4
    // Tab Inner Material 4 - Outer Material


    // Tab Lamination 5
    coat_weight_l5(frm) {
        var cost_solid_glue_1_kg_l5 = parseFloat(frm.doc.cost_solid_glue_1_kg_l5).toFixed(3);
        var coat_weight_l5 = frm.doc.coat_weight_l5;
        var cost_solid_glue_1_m2_l5 = (cost_solid_glue_1_kg_l5/1000) * coat_weight_l5;
        if (!isNaN(cost_solid_glue_1_m2_l5))
            frm.set_value("cost_solid_glue_1_m2_l5", cost_solid_glue_1_m2_l5.toFixed(4));

        var cost_of_glue_for_material_1_mtr_length_l5 = (cost_solid_glue_1_m2_l5 * 1.5).toFixed(3);
        if (!isNaN(cost_of_glue_for_material_1_mtr_length_l5))
            frm.set_value("cost_of_glue_for_material_1_mtr_length_l5", cost_of_glue_for_material_1_mtr_length_l5)

        var pairs_per_meter = frm.doc.pairs_per_meter
        var cost_per_cup_l5 = cost_of_glue_for_material_1_mtr_length_l5 / pairs_per_meter;
        if (!isNaN(cost_per_cup_l5))
            frm.set_value("cost_per_cup_l5", cost_per_cup_l5.toFixed(3));
        
        
    },


    // Tab Outer Liner
    article_ol(frm) {
        var pairs_per_meter = frm.doc.pairs_per_meter
        var cost_per_meter_ol = frm.doc.cost_per_meter_ol
        var cost_per_cup_ol = cost_per_meter_ol/pairs_per_meter
        var cost_per_cup_ol_ = cost_per_cup_ol.toFixed(3)
        frm.set_value("cost_per_cup_ol", cost_per_cup_ol_)
    },


    // Tab Raw Material Cost + Lamination Cost
    // total_raw_material_cost_per_cup = cost_per_cup_inner_liner + cost_per_cup_im1 + cost_per_cup_im2 + cost_per_cup_im3 + cost_per_cup_im4 + cost_per_cup_ol
    // total_lamination = cost_per_cup_l1 + cost_per_cup_l2 + cost_per_cup_l3 + cost_per_cup_l4 + cost_per_cup_l5
    lamination_wastage(frm) {
        var lamination_wastage = frm.doc.lamination_wastage
        var total_lamination = frm.doc.total_lamination
        var total_lamination_with_wastage = total_lamination * (lamination_wastage/100)
        console.log("total_lamination_with_wastage");
        console.log(total_lamination_with_wastage);
        frm.set_value("total_lamination_with_wastage", total_lamination_with_wastage.toFixed(3))

        var total_lamination_cost = parseFloat(total_lamination) + parseFloat(total_lamination_with_wastage);
        console.log("total_lamination_cost");
        console.log(total_lamination_cost);
        frm.set_value("total_lamination_cost", total_lamination_cost.toFixed(3));
    },


    // Tab Overhead
    overhead_type(frm){
        var basic = 0.16; var push_up = 0.18; var insert_wire = 0.32; var spacer = 0.15; var manual_spray = 0.2; 
        var overhead_type = frm.doc.overhead_type;
        if (overhead_type == "Basic") { frm.set_value("overhead_cost", basic); }
        if (overhead_type == "Push Up") { frm.set_value("overhead_cost", push_up); }
        if (overhead_type == "Insert Wire") { frm.set_value("overhead_cost", insert_wire); }
        if (overhead_type == "Spacer") { frm.set_value("overhead_cost", spacer); }
        if (overhead_type == "Manual Spray") { frm.set_value("overhead_cost", manual_spray); }
    },

    add_wastage_process_time(frm){
        var total_process_time_minute = frm.doc.total_process_time_minute;
        var wastage_oh = total_process_time_minute * 10 / 100;
        frm.set_value("wastage_oh", wastage_oh);
        var total_time_for_all_pairs = total_process_time_minute + wastage_oh;
        frm.set_value("total_time_for_all_pairs", total_time_for_all_pairs);
        var total_time_for_1_pairs = total_time_for_all_pairs / 1500;
        frm.set_value("total_time_for_1_pairs", total_time_for_1_pairs)

    },

    overhead_cost_per_minute(frm){
        var total_time_for_1_pairs = frm.doc.total_time_for_1_pairs;
        var overhead_cost_per_minute = frm.doc.overhead_cost_per_minute;
        var overhead_cost_per_cup_pair = total_time_for_1_pairs * overhead_cost_per_minute;
        frm.set_value("overhead_cost_per_cup_pair", overhead_cost_per_cup_pair.toFixed(5));
    },


    
    // Tab Cup Price
    wastage_manufacture_percent(frm){
        var manufacturing_cost = frm.doc.manufacturing_cost;
        if (manufacturing_cost == undefined) manufacturing_cost = 0;

        var wastage_manufacture_percent = frm.doc.wastage_manufacture_percent;
        if (wastage_manufacture_percent == undefined) wastage_manufacture_percent = 0;

        var wastage_manufacture = manufacturing_cost * wastage_manufacture_percent / 100;
        if (wastage_manufacture == undefined) wastage_manufacture = 0;
        frm.set_value("wastage_manufacture", wastage_manufacture.toFixed(3));

        var manufacturing_cost_with_wastage = parseFloat(manufacturing_cost) + parseFloat(wastage_manufacture);
        frm.set_value("manufacturing_cost_with_wastage", manufacturing_cost_with_wastage.toFixed(3));
    },

    packaging_cost_percent(frm){
        var manufacturing_cost = frm.doc.manufacturing_cost;
        if (manufacturing_cost == undefined) manufacturing_cost = 0;

        var packaging_cost_percent = frm.doc.packaging_cost_percent;
        if (packaging_cost_percent == undefined) packaging_cost_percent = 0;

        var packaging_cost = manufacturing_cost * packaging_cost_percent / 100;
        frm.set_value("packaging_cost", packaging_cost.toFixed(3));
    },

    transport_cost_percent(frm){
        var manufacturing_cost = frm.doc.manufacturing_cost;
        if (manufacturing_cost == undefined) manufacturing_cost = 0;

        var transport_cost_percent = frm.doc.transport_cost_percent;
        if (transport_cost_percent == undefined) transport_cost_percent = 0;

        var transport_cost = manufacturing_cost * transport_cost_percent / 100;
        frm.set_value("transport_cost", transport_cost.toFixed(3));
    },

    mold_cost(frm){
        var manufacturing_cost_with_wastage = frm.doc.manufacturing_cost_with_wastage;
        if (manufacturing_cost_with_wastage == undefined) manufacturing_cost_with_wastage = 0;
        
        var packaging_cost = frm.doc.packaging_cost;
        if (packaging_cost == undefined) packaging_cost = 0;
        
        var transport_cost = frm.doc.transport_cost;
        if (transport_cost == undefined) transport_cost = 0;

        var mold_cost = frm.doc.mold_cost;
        if (mold_cost == undefined || mold_cost == "") mold_cost = 0;
        console.log("mold_cost");
        console.log(mold_cost);

        var total_cost = parseFloat(manufacturing_cost_with_wastage) + parseFloat(packaging_cost) + parseFloat(transport_cost) + parseFloat(mold_cost);
        // if (!isNaN(total_cost))
            frm.set_value("total_cost", total_cost.toFixed(3));
    },

    profit_percent(frm){
        var total_cost = frm.doc.total_cost;
        if (total_cost == undefined) total_cost = 0;

        var profit_percent = frm.doc.profit_percent;
        if (profit_percent == undefined) profit_percent = 0;

        var profit = total_cost * profit_percent / 100;
        frm.set_value("profit", profit.toFixed(3));

        var cup_price = parseFloat(total_cost) + parseFloat(profit);
        frm.set_value("cup_price", cup_price.toFixed(3));
    },


});
// end frappe.ui.form.on("Costing", {



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
                            "costing_accessories.costing_for_accessories.doctype.costing.costing.get_pairs_meter",
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



// =============== //
// Set Child Table //
// =============== //

// Tab Lamination 1
frappe.ui.form.on('Lamination', { // The child table is defined in a DoctType called "Dynamic Link"
    table_lamination1_add(frm, cdt, cdn) { // "links" is the name of the table field in ToDo, "_add" is the event
        // frm: current ToDo form
        // cdt: child DocType 'Dynamic Link'
        // cdn: child docname (something like 'a6dfk76')
        // cdt and cdn are useful for identifying which row triggered this event
        // frappe.msgprint('A row has been added to the links table 🎉 ');

    },
    form_render(frm, cdt, cdn) {
        // console.log("form_render")
        // var row = frappe.get_doc(cdt, cdn);
        console.log(frm.doc.table_lamination1);
	},

    mix_amount_kg(frm, cdt, cdn) {
        // cdt is Child DocType name i.e Quotation Item
        // cdn is the row name for e.g bbfcb8da6a
        var row = frappe.get_doc(cdt, cdn);

        // console.log("mix_amount_kg"); console.log(cdt); console.log(cdn); console.log(row);
        var price_per_kg = row.price_per_kg;
        var mix_amount_kg = row.mix_amount_kg;
        var cost_of_mixed_amount = price_per_kg * mix_amount_kg;
        frappe.model.set_value(cdt, cdn, "cost_of_mixed_amount", cost_of_mixed_amount);
    },

    solid_percent(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        var solid_percent = row.solid_percent
        var solvent_percent = 100 - solid_percent;
        frappe.model.set_value(cdt, cdn, "solvent_percent", solvent_percent);
    },
});


// Tab Lamination 5
frappe.ui.form.on('Lamination 5', { // The child table is defined in a DoctType called "Dynamic Link"
    table_lamination5_add(frm, cdt, cdn) { // "links" is the name of the table field in ToDo, "_add" is the event
        // frm: current ToDo form
        // cdt: child DocType 'Dynamic Link'
        // cdn: child docname (something like 'a6dfk76')
        // cdt and cdn are useful for identifying which row triggered this event
        // frappe.msgprint('A row has been added to the links table 🎉 ');

    },
    form_render(frm, cdt, cdn) {
        // console.log("form_render")
        // var row = frappe.get_doc(cdt, cdn);
        console.log(frm.doc.table_lamination5);
	},

    mix_amount_kg(frm, cdt, cdn) {
        // cdt is Child DocType name i.e Quotation Item
        // cdn is the row name for e.g bbfcb8da6a
        var row = frappe.get_doc(cdt, cdn);

        // console.log("mix_amount_kg"); console.log(cdt); console.log(cdn); console.log(row);
        var price_per_kg = row.price_per_kg;
        var mix_amount_kg = row.mix_amount_kg;
        var cost_of_mixed_amount = price_per_kg * mix_amount_kg;
        frappe.model.set_value(cdt, cdn, "cost_of_mixed_amount", cost_of_mixed_amount);
    },

    solid_percent(frm, cdt, cdn) {
        var row = frappe.get_doc(cdt, cdn);
        var solid_percent = row.solid_percent
        var solvent_percent = 100 - solid_percent;
        frappe.model.set_value(cdt, cdn, "solvent_percent", solvent_percent);
    },
});


// Tab Overhead Cost
frappe.ui.form.on('Overhead', { // The child table is defined in a DoctType called "Dynamic Link"
    table_overhead_add(frm, cdt, cdn) { // "links" is the name of the table field in ToDo, "_add" is the event
        // frm: current ToDo form
        // cdt: child DocType 'Dynamic Link'
        // cdn: child docname (something like 'a6dfk76')
        // cdt and cdn are useful for identifying which row triggered this event
        // frappe.msgprint('A row has been added to the links table 🎉 ');

    },
    form_render(frm, cdt, cdn) {
        // console.log("form_render")
        // var row = frappe.get_doc(cdt, cdn);
        console.log(frm.doc.table_overhead);
	},

    minute(frm, cdt, cdn) {
        // cdt is Child DocType name i.e Quotation Item
        // cdn is the row name for e.g bbfcb8da6a
        var row = frappe.get_doc(cdt, cdn);
        var minute = row.minute;
        var hours = minute / 60;
        frappe.model.set_value(cdt, cdn, "hours", hours.toFixed(3));

        set_man_hours(frm, cdt, cdn);
    },

    frequency(frm, cdt, cdn) {
        set_man_hours(frm, cdt, cdn);
    },

    number_people(frm, cdt, cdn) {
        set_man_hours(frm, cdt, cdn);
    },
});

function set_man_hours(frm, cdt, cdn) {
    var row = frappe.get_doc(cdt, cdn);
    var hours = row.hours;
    var frequency = row.frequency;
    var number_people = row.number_people;

    if (hours == undefined) var hours = 0;
    if (frequency == undefined) var frequency = 0;
    if (number_people == undefined) var number_people = 0;

    var man_hours = parseFloat(hours) * parseFloat(frequency) * parseFloat(number_people);
    frappe.model.set_value(cdt, cdn, "man_hours", man_hours.toFixed(3));
}
