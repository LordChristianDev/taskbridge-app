import JobPostForm from "@/components/job/post/job-post-form";
import JobPostHeader from "@/components/job/post/job-post-header";

export function JobPost() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <JobPostHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a New Job</h1>
          <p className="text-muted-foreground">Find the perfect freelancer for your project</p>
        </div>

        {/* Form */}
        <JobPostForm />
      </div>
    </div>
  );
}
