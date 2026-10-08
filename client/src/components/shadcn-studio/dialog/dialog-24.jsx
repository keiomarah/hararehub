import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCheckIcon } from "lucide-react";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
const ALIASES = {
  "west rd": "Sunny Takawira Road",
  "west road": "Sunny Takawira Road",
};

function AddressSearch({ onLocationSelect }) {
  const handleSelect = (value) => {
    const properties = value?.properties;
    const [longitude, latitude] = value?.geometry?.coordinates ?? [];

    onLocationSelect({
      address: properties?.formatted ?? "",
      latitude: properties?.lat ?? latitude,
      longitude: properties?.lon ?? longitude,
    });
  };

  const handleSuggestionChange = (suggestions) => {
    console.log("Current suggestions list:", suggestions);
  };

  const preprocess = (text) => {
    const key = text.trim().toLowerCase();
    return ALIASES[key] ?? text;
  };
  return (
    <GeoapifyContext apiKey="9fe902fc96f34c44a8e803b955ace76b">
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter your address"
        lang="en"
        limit="5"
        biasByProximity={{ lon: 31.0492, lat: -17.8292 }}
        filterByCountryCode={["zw"]}
        skipIcons={true}
        placeSelect={handleSelect}
        preprocessHook={preprocess}
        suggestionsChange={handleSuggestionChange}
      />
    </GeoapifyContext>
  );
}
const formSchema = z.object({
  category: z.enum(["water", "road", "electricity", "sanitation"], {
    required_error: "Selection of a category is required.",
  }),
  incidentType: z.string().min(1, {
    message: "Kindly identify the incident.",
  }),
  location: z.object({
    address: z.string().min(1, "Select an address from the suggestions."),
    latitude: z.number(),
    longitude: z.number(),
  }),
  description: z
    .string()
    .min(20, "Describe your issue using at least 20 characters."),
});

const IncidentForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: undefined,
      incidentType: "",
      location: undefined,
      description: "",
    },
  });

  function onSubmit(values) {
    console.log("Incident submitted:", values);
    toast.custom(() => (
      <Alert className="border-green-600 text-green-600 sm:w-122 dark:border-green-400 dark:text-green-400 *:[svg]:row-span-1">
        <CheckCheckIcon />
        <AlertTitle>
          Issue submitted successfully! Our team will reach out to you shortly.
        </AlertTitle>
      </Alert>
    ));
    form.reset();
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-4" variant="outline">
          Log an Incident
        </Button>
      </DialogTrigger>
      <DialogContent className="data-open:zoom-in-100! data-open:slide-in-from-bottom-20 data-open:duration-600 sm:max-w-106.25 border-none">
        <DialogHeader>
          <DialogTitle>Log an Incident</DialogTitle>
          <DialogDescription>
            Describe the incident you have encountered
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
            {/* Issue Select Field */}
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="issue">Incident Category</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="category"
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="water">Water</SelectItem>
                      <SelectItem value="road">Road</SelectItem>
                      <SelectItem value="electricity">Electricity</SelectItem>
                      <SelectItem value="sanitation">Sanitation</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/*Incident Type*/}
            <Controller
              name="incidentType"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Incident Type</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="incident type"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <AddressSearch
              onLocationSelect={(location) =>
                form.setValue("location", location, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            />
            {form.formState.errors.location && (
              <FieldError errors={[form.formState.errors.location]} />
            )}

            {/*Description Textarea Field */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Please describe the incident
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Provide detailed information about the incident"
                    className="min-h-30 resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
    </Dialog>
  );
};

export default IncidentForm;
