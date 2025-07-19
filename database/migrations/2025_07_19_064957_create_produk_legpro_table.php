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
        Schema::create('produk_legpro', function (Blueprint $table) {
            $table->id('id_proleg');
            $table->unsignedBigInteger('id_promosi');
            $table->unsignedBigInteger('id_legpro');
            $table->timestamps();

            $table->foreign('id_promosi')->references('id_promosi')->on('promosi')->onDelete('cascade');
            $table->foreign('id_legpro')->references('id_legpro')->on('legalitas_produk')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produk_legpro');
    }
};
