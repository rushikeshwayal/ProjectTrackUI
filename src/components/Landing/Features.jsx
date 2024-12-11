import { FileText, Calendar, Database, Clipboard, Users, Mail } from 'lucide-react';

function Features() {
  const services = [
    {
      title: "Project Data Entry",
      description: "Enter and update project details including timelines, fund utilization, and milestones.",
      icon: FileText,
    },
    {
      title: "Meeting Updates",
      description: "Track updates and instructions from Technical Subcommittee, SSRC, Apex Committee, and R&D Board meetings.",
      icon: Calendar,
    },
    {
      title: "Progress Tracking",
      description: "Submit and monitor quarterly progress and fund utilization reports in prescribed formats.",
      icon: Clipboard,
    },
    {
      title: "Admin Console",
      description: "Administer project codes, manage project metadata, and send official communications.",
      icon: Database,
    },
    {
      title: "Researcher Console",
      description: "Allow project investigators to manage project details, submit forms, and upload required documents.",
      icon: Users,
    },
    {
      title: "Notifications & Alerts",
      description: "Send reminders and alerts for deadlines, missing documents, and project completion requirements.",
      icon: Mail,
    },
  ];

  return (
    <div id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-green-400 mb-12">
                     Our Features 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 p-8"
            >
              <div className="flex items-center mb-6">
                <service.icon className="w-12 h-12 text-blue-500 mr-4" />
                <h3 className="text-2xl font-semibold text-gray-800">{service.title}</h3>
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;