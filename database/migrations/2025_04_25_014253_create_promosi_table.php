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
        Schema::create('promosi', function (Blueprint $table) {
            $table->id('id_promosi');
            $table->string('nama_produk');
            $table->string('kategori_produk');
            $table->string('sub_kategori');
            $table->integer('harga_produk');
            $table->text('deskripsi_produk');
            $table->string('foto_produk');
            $table->unsignedBigInteger('id_umkm')->nullable();
            $table->enum('user_type', ['pegawai', 'umkm']);

            $table->foreign('id_umkm')->references('id')->on('umkm')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promosi');
    }
};
