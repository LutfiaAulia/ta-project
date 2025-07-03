<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => fn() => $request->user() ? [
                    'id' => $request->user()->id,
                    'email' => $request->user()->email,
                    'nama' => $request->user()->nama,
                    'tipe' => $request->user()->user_type,
                ] : null,
                'role' => fn() => $this->getUserRole($request),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }

    /**
     * Get user role from pegawai table
     */
    private function getUserRole(Request $request): string
    {
        if (!$request->user()) {
            return 'Guest';
        }

        $pegawai = DB::table('pegawai')
            ->where('user_id', $request->user()->id)
            ->first();

        return $pegawai?->role ?? 'Guest';
    }
}
