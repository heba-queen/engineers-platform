## Caching Strategy

- **Backend Cache Engine**: Redis using `django-redis`
- **Cached Views**:
  - `/getProjects`: All projects cached for 5 minutes
  - `/getPosts`: All posts cached for 5 minutes
- **Cache Key Examples**:
  - `all_projects`
  - `all_posts`
- **Invalidation**:
  - Cache is cleared when a new project/post is added or deleted
  - Handled using `cache.delete("all_projects")`, etc.
