import { createClient } from "@/lib/supabase/client";
import {
  mockProjects,
  mockServices,
  mockServiceGroups,
  mockCategories,
  mockClients,
  mockNews,
} from "./mockData";
import { Project, Service, ServiceGroup, ProjectCategory, Client, News } from "@/types/database";

// PROJECTS
export async function getProjects(options?: {
  featuredOnly?: boolean;
  categorySlug?: string;
  limit?: number;
}): Promise<Project[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      let query = supabase
        .from("projects")
        .select(`
          *,
          clients (*),
          project_categories (*),
          project_images (*)
        `)
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (options?.featuredOnly) {
        query = query.eq("is_featured", true);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        let result = data as Project[];
        if (options?.categorySlug && options.categorySlug !== "all") {
          result = result.filter(
            (p) => p.project_categories?.slug === options.categorySlug
          );
        }
        return result;
      }
    }
  } catch (err) {
    console.warn("Supabase not reachable, falling back to mock data", err);
  }

  // Fallback to mock data
  let result = [...mockProjects];
  if (options?.featuredOnly) {
    result = result.filter((p) => p.is_featured);
  }
  if (options?.categorySlug && options.categorySlug !== "all") {
    result = result.filter((p) => p.project_categories?.slug === options.categorySlug);
  }
  if (options?.limit) {
    result = result.slice(0, options.limit);
  }
  return result;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("projects")
        .select(`
          *,
          clients (*),
          project_categories (*),
          project_images (*)
        `)
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return data as Project;
      }
    }
  } catch (err) {
    console.warn("Supabase not reachable, falling back to mock data", err);
  }

  const project = mockProjects.find((p) => p.slug === slug);
  return project || null;
}

// SERVICES
export async function getServices(): Promise<Service[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select(`*, service_groups (*)`)
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Service[];
      }
    }
  } catch (err) {
    console.warn("Supabase error, using mock services", err);
  }
  return mockServices;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("services")
        .select(`*, service_groups (*)`)
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return data as Service;
      }
    }
  } catch (err) {
    console.warn("Supabase error, using mock services", err);
  }
  return mockServices.find((s) => s.slug === slug) || null;
}

// SERVICE GROUPS
export async function getServiceGroups(): Promise<ServiceGroup[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("service_groups")
        .select(`*, services (*)`)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ServiceGroup[];
      }
    }
  } catch (err) {
    console.warn("Supabase error, using mock service groups", err);
  }
  return mockServiceGroups;
}

// CATEGORIES
export async function getCategories(): Promise<ProjectCategory[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("project_categories")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as ProjectCategory[];
      }
    }
  } catch (err) {
    console.warn("Supabase error, using mock categories", err);
  }
  return mockCategories;
}

// CLIENTS
export async function getClients(): Promise<Client[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data as Client[];
      }
    }
  } catch (err) {
    console.warn("Supabase error, using mock clients", err);
  }
  return mockClients;
}

// STORIES / NEWS
export async function getNewsList(): Promise<News[]> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("news")
        .select(`*, profiles (*)`)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data as News[];
      }
    }
  } catch (err) {
    console.warn("Supabase error, using mock news", err);
  }
  return mockNews;
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    const supabase = createClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("news")
        .select(`*, profiles (*)`)
        .eq("slug", slug)
        .single();

      if (!error && data) {
        return data as News;
      }
    }
  } catch (err) {
    console.warn("Supabase error, using mock news", err);
  }
  return mockNews.find((n) => n.slug === slug) || null;
}
