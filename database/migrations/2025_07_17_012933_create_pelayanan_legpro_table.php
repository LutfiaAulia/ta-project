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
        Schema::create('pelayanan_legpro', function (Blueprint $table) {
            $table->id('id_pelegpro');
            $table->unsignedBigInteger('id_pelayanan');
            $table->unsignedBigInteger('id_legpro');
            $table->timestamps();

            $table->foreign('id_pelayanan')->references('id_pelayanan')->on('pelayanan_umkm')->onDelete('cascade');
            $table->foreign('id_legpro')->references('id_legpro')->on('legalitas_produk')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelayanan_legpro');
    }
};
