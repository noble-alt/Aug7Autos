import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  bucket: string;
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  bucket, 
  onImageUploaded, 
  currentImage, 
  className = "" 
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const { toast } = useToast();

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onImageUploaded(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "Error",
          description: "File size must be less than 5MB",
        });
        return;
      }
      uploadImage(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUploaded('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Click to upload an image
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        )}
      </div>
      
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={`image-upload-${bucket}`}
        disabled={uploading}
      />
      
      <Button
        type="button"
        variant="outline"
        onClick={() => document.getElementById(`image-upload-${bucket}`)?.click()}
        disabled={uploading}
        className="w-full"
      >
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </>
        )}
      </Button>
    </div>
  );
};