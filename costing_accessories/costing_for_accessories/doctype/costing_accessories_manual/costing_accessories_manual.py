# Copyright (c) 2024, PT BRA IT Dept and contributors
# For license information, please see license.txt

import json
import frappe
from frappe.model.document import Document


class CostingAccessoriesManual(Document):
	pass

@frappe.whitelist()
def get_pairs_meter(sr1, sr2, no1, no2):
	# size_row = frappe.db.get_value('Size', sz, ['kd_l', 'kd_w', 'pd_l', 'pd_w', 'md_l', 'md_w'], as_dict=1)
	# size_row.kd_l
	# size_row.kd_w
	
	# data = frappe.db.get_list('Size', 
	# 	fields=['size', 'no'],
	# 	order_by='no asc',
	# 	# filters={
	# 	# 	'no': ['>', 2],
	# 	# 	'no': ['<', 4],
	# 	# },
	# 	# filters=[[
	# 	# 	'no', 'between', ['2', '4']
	# 	# ]],
	# 	# filters={
	# 	# 	'no': ['between', ['2', '4']]
	# 	# },
	# )

	# data = frappe.db.get_list('Consumption', 
	# 	filters=[[
	# 		'date', 'between', ['2020-04-01', '2021-03-31']
	# 	]]
	# )

	qr = "SELECT no, size FROM tabSize WHERE no >= "+ no1 +" AND no <= "+ no2 +" ORDER BY no"
	data = frappe.db.sql(qr, as_dict=True)

	qty = 0
	pm = 0
	ix = 0
	for x, y in data:
		no = data[ix][x]
		size = data[ix][y]

		qty_foam_cup_per_m_prs = frappe.db.get_value('Consumption', {'size':size}, 'qty_foam_cup_per_m_prs')
								 
		qty = qty + int(qty_foam_cup_per_m_prs)
		pm = pm + int(no)
		ix = ix + 1

	qty = qty / ix

	# qty_foam_cup_per_m_prs = frappe.db.get_value('Consumption', {'size':sr1}, 'qty_foam_cup_per_m_prs')
	# return qty_foam_cup_per_m_prs

	return qty
