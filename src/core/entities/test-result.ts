import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

type ProviderResultType = {
  invalid: boolean;
  recorded: boolean;
};

type ResultType = {
  name: string;
  value: boolean;
};

type DeviceInformationType = {
  applicationVersion: string;
  isTablet: boolean;
  os: string;
  osVersion: string;
  mobileBuild: string;
  model: string;
  brand: string;
  deviceID: string;
};

type LocationType = {
  lng: number;
  lat: number;
};

@Entity("test_result")
export class TestResult {

  @PrimaryGeneratedColumn("uuid")
  public ID!: string;

  @Column("text")
  public Message: string;

  @Column("varchar")
  public ImageAnalysisRevision: string;

  @Column("int")
  public ProcessingDuration: number;

  @Column("timestamp")
  public Kind: Timestamp;

  @Column("varchar")
  public TestType: string;
  
  @Column("varchar")
  public ErrorCode: number;

  @Column("varchar")
  public GroupId: string;

  @Column("jsonb")
  public ProviderResult: ProviderResultType;

  @Column("varchar")
  public ImageLocation: string;

  @Column("timestamp")
  public ProcessedAt: Timestamp;

  @Column("varchar")
  public RawResult: string;

  @Column("timestamp")
  public CreatedAt: Timestamp;

  @Column("varchar")
  public SupportCode: string;

  @Column("jsonb", { array: true })
  public Result: ResultType[];

  @Column("varchar")
  public PreviewImageLocation: string;

  @Column("timestamp")
  public GroupSort: Timestamp;

  @Column("jsonb")
  public DeviceInformation: DeviceInformationType;

  @Column("varchar")
  public State: string;

  @Column("varchar")
  public Bucket: string;

  @Column("varchar")
  public CassetteType: string;

  @Column("jsonb")
  public Location: LocationType;
  
  @Column("varchar")
  public InventoryID: string;
}
