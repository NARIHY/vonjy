<?php

namespace App\Policies\Journale;

use App\Models\Journale\ActualiteModel;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ActualitePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, ActualiteModel $actualite): bool
    {
        return  true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, ActualiteModel $actualite): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, ActualiteModel $actualite): bool
    {
        return $user->id === $actualite->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ActualiteModel $actualite): bool
    {
        return $user->id === $actualite->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ActualiteModel $actualiteModel): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ActualiteModel $actualiteModel): bool
    {
        return false;
    }
}
