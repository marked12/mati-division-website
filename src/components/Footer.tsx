export default function Footer() {
    return (
        <footer className="bg-secondary mt-20 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <h3 className="text-lg font-bold mb-4">Mati City Division</h3>
                        <p className="text-muted-foreground max-w-sm">
                            The official portal for public service, infrastructure updates, and disaster risk management in Mati City.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary">Transparency Seal</a></li>
                            <li><a href="#" className="hover:text-primary">Bid Opportunities</a></li>
                            <li><a href="#" className="hover:text-primary">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>City Hall, Mati City</li>
                            <li>contact@maticity.gov</li>
                            <li>(087) 123-4567</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
                    © 2026 Mati City Division. All rights reserved.
                </div>
            </div>
        </footer>
    );
}