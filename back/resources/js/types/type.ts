// resources/js/Pages/Actualites/types.ts

export type MediaType = 'photo' | 'video';

export interface Media {
  id: number;
  type: MediaType;
  url: string;
}

export interface Actualite {
  id: number;
  titre: string;
  slug: string;
  contenu?: string;
  published_at: string; // ISO string
  created_at?: string;
  updated_at?: string;
  medias: Media[];
}

export interface Pagination<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  // Vous pouvez étendre avec d’autres champs si besoin (links, etc.)
}

export interface IndexProps {
  actualites: Pagination<Actualite>;
  flash?: {
    message?: string;
  };
}

export interface CreateFormData {
  titre: string;
  contenu: string;
  published_at: string;
  medias: File[]; // fichiers sélectionnés
  [key: string]: string | number | boolean | File | File[] | number[];
}

export interface EditFormData extends CreateFormData {
  // Ce champ contient les IDs des médias existants à conserver
  media_a_conserver: number[];
}

export interface EditProps {
  actualite: Pick<
    Actualite,
    'id' | 'titre' | 'contenu' | 'published_at'
  > & {
    medias: Media[];
  };
}

export interface ShowProps {
  actualite: Actualite;
}
