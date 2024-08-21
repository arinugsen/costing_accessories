# Copyright (c) 2024, PT BRA IT Dept and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document

import json
import requests
from requests.auth import HTTPBasicAuth
from requests.auth import HTTPDigestAuth



class post_json(Document):
	pass


@frappe.whitelist()
def post_json():

	# Use requests
	# raw_body = {"username":"busanaremaja", "password":"SaveBray2018"}
	# auth = requests.post('https://apisdev-gw.beacukai.go.id/nle-oauth/v1/user/login', json=raw_body).json()

	# status = auth["status"]
	# message = auth["message"]
	# item = auth["item"]
	# access_token = item["access_token"]
	# token_type = item["token_type"]
	# id_token = item["id_token"]
	# expires_in = item["expires_in"]
	# refresh_expires_in = item["refresh_expires_in"]
	# refresh_token = item["refresh_token"]
	# session_state = item["session_state"]
	# scope = item["scope"]
	
	# headers = {"Authorization": f"Bearer {access_token}"}

	# data = json_data()
	# data = data[0]
	# data = json.loads(data["jsonresult"])
	# res = requests.post('https://apisdev-gw.beacukai.go.id/openapi/document', headers=headers, json=data)


	# Use session, for multi request/page
	# The Session object allows you to persist certain parameters across requests. It also persists cookies across all requests made from the Session instance, 
	# and will use urllib3’s connection pooling. So if you’re making several requests to the same host, the underlying TCP connection will be reused, 
	# which can result in a significant performance increase. urllib3, keep-alive is 100% automatic within a session! Any requests that you make within a session will automatically reuse the appropriate connection
	ses = requests.Session()
	raw_body = {"username":"busanaremaja", "password":"SaveBray2018"}
	auth = ses.post('https://apisdev-gw.beacukai.go.id/nle-oauth/v1/user/login', json=raw_body).json()

	status = auth["status"]
	message = auth["message"]
	item = auth["item"]
	access_token = item["access_token"]
	token_type = item["token_type"]
	id_token = item["id_token"]
	expires_in = item["expires_in"]
	refresh_expires_in = item["refresh_expires_in"]
	refresh_token = item["refresh_token"]
	session_state = item["session_state"]
	scope = item["scope"]

	headers = {"Authorization": f"Bearer {access_token}"}

	data = json_data()
	data = data[0]
	data = json.loads(data["jsonresult"])
	res = ses.post('https://apisdev-gw.beacukai.go.id/openapi/document', headers=headers, json=data)


	# return auth.status_code
	# return res.status_code
	# return res.request.headers["Authorization"]
	# return res.headers
	# return res.headers["Content-Type"]
	# return data
	# return str(data)
	# return auth.text
	return res.text




@frappe.whitelist()
def json_data():
	test_q = """

	SELECT JSON_PRETTY(JSON_OBJECT(
	'asalData',asal_data,
	'asuransi',round(asuransi,2),
	'bruto',round(bruto,2),
	'cif',round(cif,2),
	'fob',round(fob,2),
	'freight',round(freight,2),
	'hargaPenyerahan',round(harga_penyerahan,0),
	'jabatanTtd', IFNULL(jabatan_ttd,''),
	'jumlahKontainer', 
	(select cast( count(*) as int)
	from  _6f1d86339738b410.tabKontainer where parent = _6f1d86339738b410.`tabData Header`.name),
	'kodeAsuransi',kode_asuransi,
	'kodeDokumen',kode_dokumen,
	'kodeIncoterm',Kode_incoterm,
	'kodeKantor',kode_kantor,
	'kodeKantorBongkar',kode_kantor_bongkar,
	'kodePelBongkar',kode_pel_tujuan,
	'kodePelMuat',kode_pel_muat,
	'kodePelTransit', IFNULL(kode_pel_transit,''),
	'kodeTps',code_tps,
	'kodeTujuanTpb',code_tujuan_tpb,
	'kodeTutupPu',code_tutup_pu,
	'kodeValuta',kode_valuta,
	'kotaTtd',tempat_ttd,
	'namaTtd',nama_ttd,
	'ndpbm',CAST(ndpbm AS DECIMAL(16,2)),
	'netto',CAST(netto AS DECIMAL(16,2)),
	'nik', IFNULL(nik,''),
	'nilaiBarang', CAST(nilai_barang AS DECIMAL(16,2)),
	'nomorAju',nomor_aju,
	'nomorBc11',IFNULL(nomor_bc11,''),
	'posBc11',IFNULL(pos_bc11,''),
	'seri',seri,
	'subposBc11',IFNULL(sub_pos_bc11,''),
	'tanggalBc11',tanggal_bc11,
	'tanggalTiba',tanggal_tiba,
	'tanggalTtd',tanggal_ttd,
	'biayaTambahan',CAST(biaya_tambahan AS DECIMAL(16,2)),
	'biayaPengurang',CAST(biaya_pengurang AS DECIMAL(16,2)),
	'kodeKenaPajak',code_kena_pajak,
	'barang',(select JSON_ARRAYAGG(JSON_OBJECT(
		'idBarang',kode_barang,
		'asuransi',CAST(asuransi AS DECIMAL(16,2)),
		'cif',CAST(cif AS DECIMAL(16,2)),
		'diskon',CAST(diskon AS DECIMAL(16,2)),
		'fob',CAST(fob AS DECIMAL(16,2)),
		'freight', CAST(freight AS DECIMAL(16,2)),
		'hargaEkspor',CAST(harga_ekspor AS DECIMAL(16,2)),
		'hargaPenyerahan', CAST(harga_penyerahan AS DECIMAL(16,2)),
		'hargaSatuan',CAST(harga_satuan AS DECIMAL(16,2)), 
		'isiPerKemasan',CAST(isi_per_kemasan AS DECIMAL(16,2)),
		'jumlahKemasan',CAST(jumlah_kemasan AS INT),
		'jumlahSatuan', CAST(jumlah_satuan AS DECIMAL(16,2)),
		'kodeBarang',kode_barang,
		'kodeDokumen',kode_dokumen,
		'kodeKategoriBarang', kode_kategori_barang,
		'kodeJenisKemasan',kode_jenis_kemasan,
		'kodeNegaraAsal',code_negara_asal,
		'kodePerhitungan',code_perhitungan,
		'kodeSatuanBarang',kode_satuan_barang,
		'merk',merk,
		'netto',CAST(netto AS DECIMAL(16,2)),
		'nilaiBarang',CAST(nilai_barang AS DECIMAL(16,2)),
		'nilaiTambah',CAST(nilai_tambah AS DECIMAL(16,2)),
		'posTarif',pos_tarif,
		'seriBarang',seri_barang,
		'spesifikasiLain',IFNULL(spesifikasi_lain,'-'),
		'tipe',tipe,
		'ukuran',IFNULL(ukuran,'-'),
		'uraian',uraian,
		'ndpbm',CAST(ndpbm AS DECIMAL(16,2)),
		'cifRupiah',CAST(cif_rupiah AS DECIMAL(16,2)),
		'hargaPerolehan',CAST(harga_perolehan AS DECIMAL(16,2)), 
		'kodeAsalBahanBaku',code_asal_bahan_baku
		,

		'barangTarif',(select JSON_ARRAYAGG(JSON_OBJECT(
		'kodeJenisTarif',bpd.kode_jenis_tarif,
		'jumlahSatuan',bpd.jumlah_satuan,
		'kodeFasilitasTarif',bpd.kode_fasilitas_tarif,
		'kodeSatuanBarang',bpd.kode_satuan_barang,
		'kodeJenisPungutan',bpd.kode_jenis_pungutan,
		'nilaiBayar', CAST(bpd.nilai_bayar AS DECIMAL(16,2)), 
		'nilaiFasilitas',CAST(bpd.nilai_fasilitas AS DECIMAL(16,2)), 
		'nilaiSudahDilunasi',CAST(bpd.nilai_sudah_dilunasi AS DECIMAL(16,2)), 
		'seriBarang',CAST(bpd.seri_barang AS INT), 
		'tarif', CAST(bpd.tarif AS DECIMAL(16,2)),
		'tarifFasilitas', CAST(bpd.tarif_fasilitas AS DECIMAL(16,2)) 
		)) 
		-- from  _6f1d86339738b410.tabBarang Detail where nomor_data_header ='BRA-2406-000005' and _6f1d86339738b410.tabBarang Detail.name = _6f1d86339738b410.tabBarang.name
		from  _6f1d86339738b410.`tabBarang Pungutan Detail` bpd, _6f1d86339738b410.`tabBarang Detail` bd,  _6f1d86339738b410.tabBarang b
		where 
		b.parent = bd.nomor_data_header 
		and _6f1d86339738b410.tabBarang.name = bd.name
		and b.parent = _6f1d86339738b410.`tabData Header`.name
		and bd.name = b.name
		and bpd.parent = bd.name
		),
		
		'barangDokumen',
		(select JSON_ARRAYAGG(JSON_OBJECT(
		'seriDokumen',seri_dokumen
		)) from   _6f1d86339738b410.`tabBarang Dokumen` bdok, _6f1d86339738b410.`tabBarang Detail` bd,  _6f1d86339738b410.tabBarang b
		where 
		b.parent = bd.nomor_data_header 
		and _6f1d86339738b410.tabBarang.name = bd.name
		and b.parent = _6f1d86339738b410.`tabData Header`.name
		and bd.name = b.name
		and bdok.parent = bd.name
		
		)
		
		)) from _6f1d86339738b410.tabBarang where parent = _6f1d86339738b410.`tabData Header`.name),
		
		'entitas', (select JSON_ARRAYAGG(JSON_OBJECT(
						'alamatEntitas',alamat_entitas,
						'kodeEntitas',kode_entitas,
						'kodeJenisApi',code_jenis_api,
						'kodeNegara',code_negara,
						'kodeJenisIdentitas',code_jenis_identitas,
						'kodeStatus',code_status,
						'namaEntitas',nama_entitas,
						'nibEntitas',nib_entitas,
						'nomorIdentitas',nomor_identitas,
						'nomorIjinEntitas',nomor_ijin_entitas,
						'tanggalIjinEntitas',tanggal_ijin_entitas,
						'seriEntitas', CAST(seri_entitas AS INT) 
		)) from  _6f1d86339738b410.tabEntitas where parent = _6f1d86339738b410.`tabData Header`.name),
		'kemasan', (select JSON_ARRAYAGG(JSON_OBJECT(
						'jumlahKemasan',jumlah_kemasan,
						'kodeJenisKemasan',kode_jenis_kemasan,
						'seriKemasan',seri_kemasan,
						'merkKemasan',IFNULL(merk_kemasan,'-')		
		)) from  _6f1d86339738b410.tabKemasan where parent = _6f1d86339738b410.`tabData Header`.name),
		
		'kontainer', (select JSON_ARRAYAGG(JSON_OBJECT(
						'kodeTipeKontainer',code_tipe_kontainer,
						'kodeUkuranKontainer',code_ukuran_kontainer,
						'seriKontainer',seri_kontainer,
						'nomorKontainer',nomor_kontainer,
						'kodeJenisKontainer',code_jenis_kontainer		
		)) from  _6f1d86339738b410.tabKontainer where parent = _6f1d86339738b410.`tabData Header`.name),
		
		'dokumen', (select JSON_ARRAYAGG(JSON_OBJECT(
						-- 'idDokumen',idDokumen,
						'kodeDokumen',kode_dokumen,
						'nomorDokumen',nomor_dokumen,
						'seriDokumen',seri_dokumen,
						'tanggalDokumen',tanggal_dokumen		
		)) from  _6f1d86339738b410.tabDokumen where parent = _6f1d86339738b410.`tabData Header`.name),
		
		'pengangkut', (select JSON_ARRAYAGG(JSON_OBJECT(
						'kodeBendera',code_bendera,
						'namaPengangkut',nama_pengangkut,
						'nomorPengangkut',nomor_pengangkut,
						'kodeCaraAngkut',code_cara_angkut,
						'seriPengangkut',seri_pengangkut		
		)) from  _6f1d86339738b410.tabPengangkut where parent= _6f1d86339738b410.`tabData Header`.name)
		
	))
	as jsonresult from _6f1d86339738b410.`tabData Header` where name = 'BRA-2406-000005';

	"""
	
	return frappe.db.sql(test_q, as_dict=True)
	# return frappe.db.sql(test_q, as_dict=False)