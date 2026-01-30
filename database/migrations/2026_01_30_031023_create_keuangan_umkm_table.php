<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('keuangan_umkm', function (Blueprint $table) {
            $table->id('id_keuangan');
            $table->foreignId('umkm_id')->constrained('umkm')->onDelete('cascade');
            $table->year('tahun');
            $table->decimal('aset', 15, 2)->default(0);
            $table->decimal('omset', 15, 2)->default(0);
            $table->integer('jumlah_karyawan')->default(0);
            $table->unique(['umkm_id', 'tahun']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keuangan_umkm');
    }
};
