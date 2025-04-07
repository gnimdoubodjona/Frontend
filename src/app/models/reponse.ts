export interface Reponse {
    // accepter = models.BooleanField()
    // candidature = models.ForeignKey(Candidature, related_name="candidature", on_delete=models.CASCADE)
    // refuser = models.BooleanField()
    // motifs = models.CharField(max_length=100)
    id:number;
    candidature: number;
    reponse : boolean;
    motifs : string;
}
