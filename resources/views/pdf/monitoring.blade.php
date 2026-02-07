<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Monitoring Keuangan UMKM</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 11px; color: #333; }
        .header { text-align: center; margin-bottom: 25px; border-bottom: 2px solid #444; padding-bottom: 10px; }
        .header h2 { margin: 0; text-transform: uppercase; font-size: 16px; }
        .header p { margin: 5px 0 0; font-size: 12px; color: #666; }
        
        .info-table { margin-bottom: 15px; width: 100%; }
        
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background-color: #f2f2f2; color: #444; font-weight: bold; text-transform: uppercase; border: 1px solid #999; padding: 8px; }
        td { border: 1px solid #ccc; padding: 8px; vertical-align: middle; }
        
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .font-bold { font-weight: bold; }
        .text-muted { color: #888; font-style: italic; }
        
        tr:nth-child(even) { background-color: #fafafa; }
    </style>
</head>
<body>
    <div class="header">
        <h2>Laporan Monitoring Perkembangan Keuangan UMKM</h2>
        <p>PLUT-KUMKM (Pusat Layanan Usaha Terpadu - Koperasi Usaha Mikro Kecil dan Menengah)</p>
    </div>

    <table class="info-table" style="border: none;">
        <tr>
            <td style="border: none; width: 100px;">Filter Tahun</td>
            <td style="border: none;">: <strong>{{ $tahun_filter }}</strong></td>
            <td style="border: none; text-align: right;">Tanggal Cetak: {{ $date }}</td>
        </tr>
    </table>

    <table>
        <thead>
            <tr>
                <th width="30">No</th>
                <th>Nama Usaha / UMKM</th>
                <th width="60">Tahun</th>
                <th>Aset (Rp)</th>
                <th>Omset (Rp)</th>
                <th width="70">Karyawan</th>
            </tr>
        </thead>
        <tbody>
            @php 
                $lastUmkmId = null; 
            @endphp
            
            @forelse($riwayat as $index => $item)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                
                @if($item->umkm_id !== $lastUmkmId)
                    <td class="font-bold">
                        {{ $item->umkm->identitas->nama_usaha ?? 'Tidak Terdaftar' }}
                    </td>
                    @php $lastUmkmId = $item->umkm_id; @endphp
                @else
                    <td class="text-center text-muted">
                        (idem)
                    </td>
                @endif

                <td class="text-center">{{ $item->tahun }}</td>
                <td class="text-right">{{ number_format($item->aset, 0, ',', '.') }}</td>
                <td class="text-right">{{ number_format($item->omset, 0, ',', '.') }}</td>
                <td class="text-center">{{ $item->jumlah_karyawan }} Orang</td>
            </tr>
            @empty
            <tr>
                <td colspan="6" class="text-center" style="padding: 20px;">Data tidak ditemukan untuk periode ini.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 30px; float: right; width: 200px; text-align: center;">
        <p>Dicetak Oleh,</p>
        <br><br><br>
        <p><strong>Sistem Monitoring PLUT</strong></p>
    </div>
</body>
</html>