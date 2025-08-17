package NKS.crowdsourced_issue_tracker.model;

public enum Category {
    ROADS_INFRASTRUCTURE("Roads & Infrastructure"),
    STREET_LIGHTING("Street Lighting"),
    WASTE_MANAGEMENT("Waste Management"),
    WATER_DRAINAGE("Water & Drainage"),
    PUBLIC_SAFETY("Public Safety"),
    PARKS_RECREATION("Parks & Recreation"),
    TRAFFIC_TRANSPORTATION("Traffic & Transportation"),
    OTHER("Other");

    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
